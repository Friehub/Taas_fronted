import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "TaaS Protocol",
  description: "The Verifiable Fact Engine for On-Chain Data",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Networks', link: '/networks/hoodi' },
      { text: 'User Guides', link: '/guides/getting-started' }
    ],

    sidebar: [
      {
        text: 'Foundation',
        collapsed: false,
        items: [
          { text: 'The Fact Engine', link: '/' },
          { text: 'Why TaaS?', link: '/guides/why-taas' },
          { text: 'Getting Started', link: '/guides/getting-started' }
        ]
      },
      {
        text: 'Network Status',
        collapsed: false,
        items: [
          { text: 'Sepolia (Public Testnet)', link: '/networks/sepolia' },
          { text: 'Hoodi (Holesky Institutional)', link: '/networks/hoodi' }
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
