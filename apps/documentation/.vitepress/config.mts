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
          { text: 'Data Provider Registry', link: '/protocol/data-feeds' }
        ]
      },
      {
        text: 'Developer Tools',
        collapsed: false,
        items: [
          { text: 'Framework Setup', link: '/guides/sdk/installation' },
          { text: 'On-Chain Integration', link: '/guides/sdk/integration' },
          { text: 'SDK Documentation', link: '/guides/taas-sdk' }
        ]
      },
      {
        text: 'Network Operation',
        collapsed: false,
        items: [
          { text: 'Truth Node Setup', link: '/nodes/truth-node' }
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
