import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "node:path";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "zkCloudWorker",
  tagline: "A fast cloud proving service for zkApps",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.zkcloudworker.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "zkcloudworker", // Usually your GitHub org/user name.
  projectName: "zkcloudworker", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    [
      "docusaurus-plugin-typedoc-api",
      {
        projectRoot: path.join(__dirname, ""),
        packages: [
          "zkcloudworker-lib",
          "silvana-lib/packages/api",
          "silvana-lib/packages/abi",
          "silvana-lib/packages/token",
          "silvana-lib/packages/nft",
          "silvana-lib/packages/storage",
          "silvana-lib/packages/upgradable",
          "silvana-lib/packages/mina-utils",
          "silvana-lib/packages/mina-prover",
          "silvana-lib/packages/prover",
        ],
        banner:
          "Start building your zkApp today with a fast cloud proving service for zkApps - zkCloudWorker!",
        typedocOptions: {
          excludeExternals: true,
        },
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi", // plugin   id
        docsPluginId: "@docusaurus/preset-classic", // configured for preset-classic
        config: {
          silvana: {
            specPath: "silvana-lib/packages/api/open-api.yaml",
            //specPath: "openapi/open-api.yaml",
            outputDir: "docs/OpenAPI",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          docItemComponent: "@theme/ApiItem",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },

        gtag: {
          trackingID: "G-JS5QHBLWPY",
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "rust",
        language: "rust",
        logoClass: "rust",
      },
      {
        highlight: "ocaml",
        language: "ocaml",
        logoClass: "ocaml",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },

      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "unirest",
      },
      {
        highlight: "powershell",
        language: "powershell",
        logoClass: "powershell",
      },
    ],
    // Replace with your project's social card
    image: "img/zkcloudworker-transparent-full.png",

    algolia: {
      // The application ID provided by Algolia
      appId: "3KVVQA5KF4",

      // Public API key: it is safe to commit it
      apiKey: "917d0c45744e32a6739c926af05d5af8", //'1f8f5474095e765135d334904b12fe61',

      indexName: "zkcloudworker",
      externalUrlRegex: "https://docs.zkcloudworker.io/coverage/",

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",

      //... other Algolia params
    },

    navbar: {
      title: "zkCloudWorker",
      logo: {
        alt: "zkCloudWorker Logo",
        src: "img/zkcloudworkerlogo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "OpenAPI",
        },
        //{to: '/blog', label: 'Blog', position: 'left'},
        {
          to: "api",
          label: "Library",
          position: "left",
        },
        {
          href: "https://github.com/zkcloudworker/zkcloudworker-lib",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/zkcloudworker",
          label: "NPM",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/",
            },
            {
              label: "zkCloudWorker API",
              to: "api",
            },
            {
              label: "MinaTokens API",
              to: "https://docs.minatokens.com",
            },
          ],
        },
        {
          title: "zkCloudWorker",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/zkcloudworker",
            },
            {
              label: "Twitter",
              href: "https://x.com/zkCloudWorker",
            },
          ],
        },
        {
          title: "DFST",
          items: [
            /*
            {
              label: 'Blog',
              to: '/blog',
            },
            */
            {
              label: "GitHub",
              href: "https://github.com/dfstio",
            },
            {
              label: "Twitter",
              href: "https://x.com/dfst_io",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DFST and Mario. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
