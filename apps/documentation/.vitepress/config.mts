import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "TaaS Protocol",
  description: "A General-Purpose Oracle AVS secured by EigenLayer",
  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/' },
      { text: 'Status', link: '/networks/hoodi' },
      { text: 'Guides', link: '/guides/getting-started' }
    ],

    sidebar: [
      {
        text: 'Specifications',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Protocol Rationale', link: '/guides/why-taas' },
          { text: 'Quick Start', link: '/guides/getting-started' }
        ]
      },
      {
        text: 'Network Status',
        collapsed: false,
        items: [
          { text: 'Sepolia Testnet', link: '/networks/sepolia' },
          { text: 'Hoodi Testnet (Holesky)', link: '/networks/hoodi' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Friehub/Taas' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 FrieHub'
    }
  }
})
