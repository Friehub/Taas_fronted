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
      { text: 'User Guides', link: '/guides/getting-started' },
      { text: 'Protocol Spec', link: '/protocol/overview' }
    ],

    sidebar: [
    {
        text: 'Foundation',
        collapsed: false,
        items: [
          { text: 'The Fact Engine', link: '/' },
          { text: 'Why TaaS?', link: '/guides/why-taas' },
          { text: 'Core Domains', link: '/guides/use-cases' }
        ]
      },
      {
        text: 'Network Status',
        collapsed: false,
        items: [
          { text: 'Sepolia (Public Testnet)', link: '/networks/sepolia' },
          { text: 'Hoodi (Holesky Institutional)', link: '/networks/hoodi' }
        ]
      },
      {
        text: 'Developer Experience',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'SDK Documentation', link: '/guides/taas-sdk' },
          { text: 'Verifiable Interfaces', link: '/guides/taas-interfaces' },
          { text: 'SDK Installation', link: '/guides/sdk/installation' },
          { text: 'Protocol Integration', link: '/guides/sdk/integration' }
        ]
      },
      {
        text: 'Understanding TruthPoints',
        collapsed: false,
        items: [
          { text: 'Protocol Overview', link: '/protocol/overview' },
          { text: 'Attestation Lifecycle', link: '/protocol/overview#attestation-lifecycle' },
          { text: 'Consumer Verification', link: '/protocol/overview#consumer-verification' }
        ]
      },
      {
          text: 'Ecosystem',
          collapsed: true,
          items: [
            { text: 'Fact Types & Categories', link: '/guides/programmable' },
            { text: 'Data Provenance Standards', link: '/guides/why-taas' }
          ]
      }
    ]
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/Friehub/Taas' }
  ],

  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2026 FrieHub'
  }
})
