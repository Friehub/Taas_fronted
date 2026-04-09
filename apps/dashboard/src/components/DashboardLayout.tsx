import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Activity, ShieldCheck, Menu, X } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Users, label: 'Validator Registry', active: false },
    { icon: Activity, label: 'Task Tracker', active: false },
    { icon: ShieldCheck, label: 'Attestation Logs', active: false },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground transition-colors duration-200">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-border bg-white dark:bg-zinc-950 transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="h-8 w-8 bg-mint rounded-none flex-shrink-0" />
          {isSidebarOpen && (
            <span className="ml-3 font-display text-lg font-bold tracking-tight">TaaS Network</span>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center rounded-none px-3 py-2.5 text-sm font-medium transition-colors",
                item.active 
                  ? "bg-muted text-mint" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            {isSidebarOpen && <span className="text-xs font-semibold uppercase text-muted-foreground">Dark Mode</span>}
            <Switch.Root
              checked={isDark}
              onCheckedChange={setIsDark}
              className="relative h-5 w-9 cursor-default rounded-none bg-zinc-200 outline-none transition-colors duration-200 data-[state=checked]:bg-mint dark:bg-zinc-800"
            >
              <Switch.Thumb className="block h-4 w-4 bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[18px] translate-x-0.5" />
            </Switch.Root>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border px-8 bg-white dark:bg-zinc-950">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:text-mint transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 rounded-none border border-border bg-muted px-3 py-1 text-xs font-mono">
              <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
              <span>{import.meta.env.VITE_NETWORK_NAME || "Network Live"}</span>
            </div>
            <div className="h-8 w-8 rounded-none border border-border bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
