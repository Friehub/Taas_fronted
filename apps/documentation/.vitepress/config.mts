import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "TaaS Gateway",
  description: "The Verifiable Data Attestation Network",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Gateway', link: '/gateway/' },
      { text: 'Plugin System', link: '/plugins/' },
      { text: 'Protocol', link: '/protocol/overview' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Why TaaS?', link: '/guides/why-taas' },
          { text: 'Core Use Cases', link: '/guides/use-cases' }
        ]
      },
      {
        text: 'Gateway',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/gateway/' },
          { text: 'Running a Node', link: '/gateway/running-a-node' },
          { text: 'Configuration Reference', link: '/gateway/configuration' },
          { text: 'CLI Reference', link: '/gateway/cli' },
          { text: 'Architecture', link: '/gateway/architecture' },
          { text: 'Fault Model & Error Codes', link: '/gateway/fault-isolation' },
          { text: 'Security Model', link: '/gateway/security' }
        ]
      },
      {
        text: 'Plugin System',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/plugins/' },
          { text: 'plugin.json Reference', link: '/plugins/plugin-manifest' },
          { text: 'Writing a Plugin', link: '/plugins/writing-a-plugin' },
          { text: 'Hot-Reload System', link: '/plugins/hot-reload' },
          { text: 'Unified Capability Model', link: '/plugins/ucm' },
          { text: 'State Guards', link: '/plugins/state-guards' },
          { text: 'Contributing a Plugin', link: '/plugins/contributing' }
        ]
      },
      {
        text: 'Protocol',
        collapsed: false,
        items: [
          { text: 'Protocol Overview', link: '/protocol/overview' },
          { text: 'TruthPoint Specification', link: '/protocol/truthpoint' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Glossary', link: '/reference/glossary' }
        ]
      },
      {
        text: 'SDK and Consumer',
        collapsed: true,
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'SDK Documentation', link: '/guides/taas-sdk' },
          { text: 'Custom Adapters', link: '/guides/taas-interfaces' }
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
