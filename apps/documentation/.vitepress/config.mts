import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
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
        text: 'Developer SDK',
        collapsed: false,
        items: [
          { text: 'Installation & Setup', link: '/guides/sdk/installation' },
          { text: 'Writing Recipes', link: '/guides/sdk/authoring' },
          { text: 'Compiling & Deploying', link: '/guides/sdk/deployment' },
          { text: 'On-Chain Integration', link: '/guides/sdk/integration' },
          { text: 'API Reference', link: '/guides/taas-sdk' }
        ]
      },
      {
        text: 'Node Operation',
        collapsed: false,
        items: [
          { text: 'Running a Truth Node', link: '/nodes/truth-node' }
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
