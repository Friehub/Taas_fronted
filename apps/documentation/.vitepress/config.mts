import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FrieHub TaaS",
  description: "The Decentralized Fact Engine",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Whitepaper', link: '/core/whitepaper' },
      { text: 'Guides', link: '/guides/development' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Core Concepts',
          items: [
            { text: 'Whitepaper', link: '/core/whitepaper' },
            { text: 'Architecture Map', link: '/core/architecture' }
          ]
        },
        {
          text: 'Protocol',
          collapsed: false,
          items: [
            { text: 'Smart Contracts', link: '/protocol/contracts' },
            { text: 'Recipes', link: '/protocol/recipes' },
            { text: 'Data Feeds', link: '/protocol/data-feeds' }
          ]
        },
        {
          text: 'Nodes',
          collapsed: false,
          items: [
            { text: 'Truth Node (Sentinel)', link: '/nodes/truth-node' },
            { text: 'Challenger Node', link: '/nodes/challenger-lite' }
          ]
        },
        {
          text: 'Developer Guides',
          collapsed: true,
          items: [
            { text: 'Development Workflow', link: '/guides/development' },
            { text: 'Workspace Setup', link: '/guides/workspace' },
            { text: 'Repo Splitting', link: '/guides/repo-split' }
          ]
        },
        {
          text: 'Operations',
          collapsed: true,
          items: [
            { text: 'VPS Setup', link: '/ops/vps-migration' },
            { text: 'Production Workflow', link: '/ops/production' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Friehub/taas-core' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 FrieHub'
    }
  }
})
