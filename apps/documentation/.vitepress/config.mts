import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Taas_frontend/',
  title: "FrieHub TaaS",
  description: "The Decentralized Fact Engine",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Why TaaS?', link: '/guides/why-taas' },
      { text: 'Use Cases', link: '/guides/use-cases' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'The Mission', link: '/guides/mission' },
          { text: 'Why TaaS?', link: '/guides/why-taas' },
          { text: 'Core Use Cases', link: '/guides/use-cases' }
        ]
      },
      {
        text: 'Protocol',
        collapsed: false,
        items: [
          { text: 'How it Works', link: '/protocol/attestation' },
          { text: 'Truth Recipes', link: '/protocol/recipes' },
          { text: 'Data Feeds', link: '/protocol/data-feeds' }
        ]
      },
      {
        text: 'Development',
        collapsed: false,
        items: [
          { text: 'Quick Start', link: '/guides/getting-started' },
          { text: 'Workflow', link: '/guides/development' }
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
})
