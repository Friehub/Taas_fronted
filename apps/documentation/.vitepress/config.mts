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
          { text: 'Why TaaS?', link: '/guides/why-taas' },
          { text: 'Why Programmable?', link: '/guides/programmable' },
          { text: 'Core Use Cases', link: '/guides/use-cases' }
        ]
      },
      {
        text: 'Protocol',
        collapsed: false,
        items: [
          { text: 'Protocol Overview', link: '/protocol/overview' }
        ]
      },
      {
        text: 'Developer Experience',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'SDK Documentation', link: '/guides/taas-sdk' },
          { text: 'Custom Adapters', link: '/guides/taas-interfaces' }
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
