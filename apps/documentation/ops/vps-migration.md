# VPS Migration & Setup Guide

This guide provides a professional approach to connecting your VPS to the new **Friehub** organization repositories.

## 1. Authentication: Per-Repository Isolation

You have chosen the secure, isolated approach: **One Deploy Key per Repository**.
This ensures that access is compartmentalized. A key for `prediction_app` cannot access `taas-core`.

### How it works
Since a VPS is a single machine, we must teach it to use different keys for different repositories. We do this using an **SSH Config** file.

- `prediction_app` will use `id_ed25519_prediction_app`
- `taas-core` will use `id_ed25519_taas-core`
- `taas-private` will use `id_ed25519_taas-private`

The provided script handles this complexity for you automatically.

## 2. Migration Script

Run the following script on your VPS to update the remote URLs and get your SSH key.

### `update_vps_remotes.sh`
Create this file on your VPS (e.g., `nano update_vps_remotes.sh`), paste the content, make it executable (`chmod +x update_vps_remotes.sh`), and run it.

```bash
#!/bin/bash

# Configuration
ORG_NAME="Friehub"
# Repositories and their new SSH aliases
declare -A REPOS
REPOS=( ["prediction_app"]="friehub_app" ["taas-core"]="taas-core" ["taas-private"]="Taas" )

echo "=========================================="
echo " Starting VPS Isolation Setup (Per-Repo Keys)"
echo "=========================================="

SSH_DIR="$HOME/.ssh"
CONFIG_FILE="$SSH_DIR/config"
BACKUP_DIR="$HOME/.ssh_backup_$(date +%Y%m%d_%H%M%S)"

# 1. Cleanup and Backup
if [ -d "$SSH_DIR" ]; then
    echo "Backing up existing .ssh to $BACKUP_DIR..."
    cp -r "$SSH_DIR" "$BACKUP_DIR"
    
    echo "Cleaning old keys..."
    rm -f "$SSH_DIR"/id_* "$SSH_DIR"/known_hosts "$SSH_DIR"/config
else
    mkdir -p "$SSH_DIR"
fi

touch "$CONFIG_FILE"
chmod 600 "$CONFIG_FILE"

echo ""
echo "=========================================="
echo " 2. Generating Keys & Configuring Access"
echo "=========================================="

BASE_DIR=$(pwd)

# Loop through repos to generate keys and config
for LOCAL_DIR in "${!REPOS[@]}"; do
    REPO_NAME="${REPOS[$LOCAL_DIR]}"
    KEY_NAME="id_ed25519_${LOCAL_DIR}"
    KEY_PATH="$SSH_DIR/$KEY_NAME"
    HOST_ALIAS="$LOCAL_DIR.github.com"
    
    echo "Processing $LOCAL_DIR..."
    
    # Generate Key
    ssh-keygen -t ed25519 -C "deploy-key-$LOCAL_DIR" -f "$KEY_PATH" -N "" > /dev/null
    
    # Add to SSH Config
    echo "Host $HOST_ALIAS" >> "$CONFIG_FILE"
    echo "  HostName github.com" >> "$CONFIG_FILE"
    echo "  User git" >> "$CONFIG_FILE"
    echo "  IdentityFile $KEY_PATH" >> "$CONFIG_FILE"
    echo "  IdentitiesOnly yes" >> "$CONFIG_FILE"
    echo "" >> "$CONFIG_FILE"
    
    # Update Git Remote
    if [ -d "$BASE_DIR/$LOCAL_DIR" ]; then
        cd "$BASE_DIR/$LOCAL_DIR"
        # Set remote to use the Alias defined in SSH config
        # syntax: git@Alias:Org/Repo.git
        NEW_URL="git@$HOST_ALIAS:$ORG_NAME/$REPO_NAME.git"
        
        git remote set-url origin "$NEW_URL"
        echo "✅ Remote updated to: $NEW_URL"
        cd "$BASE_DIR"
    else
        echo "⚠️  Directory $LOCAL_DIR not found"
    fi
    
    echo "🔑 Public Key for $LOCAL_DIR ($REPO_NAME):"
    echo "--------------------------------------------------------"
    cat "$KEY_PATH.pub"
    echo "--------------------------------------------------------"
    echo ""
done

echo "DONE! Add each key above to its respective repository's 'Deploy Keys' settings."

```

## 3. How to Execute

1. **SSH into your VPS**:
   ```bash
   ssh user@your-vps-ip
   ```
2. **Back up existing config** (Optional but recommended):
   ```bash
   cp ecosystem.config.js ecosystem.config.js.bak
   ```
3. **Run the text editor**:
   ```bash
   nano update_vps_remotes.sh
   # Paste the script content above
   # Save and exit (Ctrl+X, Y, Enter)
   ```
4. **Run the script**:
   ```bash
   chmod +x update_vps_remotes.sh
   ./update_vps_remotes.sh
   ```
5. **Add the Key to GitHub**: Use the output key and add it to your Machine User or Repositories.
6. **Verify and Restart**:
   ```bash
   # Test connection (Use the aliases, NOT git@github.com)
   ssh -T git@prediction_app.github.com
   ssh -T git@taas-core.github.com
   ssh -T git@taas-private.github.com
   
   # Run your update script to verify pulls work
   ./update-all.sh
   ```

### Troubleshooting "Permission denied (publickey)"
If you see `git@github.com: Permission denied (publickey)`, **this is expected and normal**.
Because we set up specific keys for specific aliases (e.g., `prediction_app.github.com`), the generic `github.com` connection has no key assigned to it.
**Always test with the aliases above.**
