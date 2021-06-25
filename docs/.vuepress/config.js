const { path } = require('@vuepress/utils')

module.exports = {
  lang: 'zh-CN',
  base: "/repo/",
  title: "Blog",
  description: 'A VuePress-next template..',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
  ],
  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer')
            ]
        }
      },
    }
  },
  plugins: [
    require('./plugins/addTime.js'),
    [require('./plugins/createHomePage.js'),
    {
      cards: [
        {
          name: "Folder1",
          image: "folder1-cover.svg"
        },
        {
          name: "Folder2",
          image: "folder2-cover.svg"
        },
      ]
    }],
    [require('./plugins/generateListPages.js'),
    {
      postClassifications: ['folder1', 'folder2']
    }],
    [require('./plugins/generateFolderPages.js'),
    {
      postFolders: ['folder1', 'folder2']
    }],
  ],
  // theme: '@vuepress/default',
  theme: path.resolve(__dirname, './theme/index.js'),
  themeConfig: {
    navbar: false,
    sidebar: false,
    contributors: false,
    lastUpdatedText: '更新时间',
    themePlugins: {
      backToTop: false,
      nprogress: false,
    }
  },
  markdown: {
    links: {
      externalIcon: false
    }
  },
  extendsMarkdown: (md) => {
    md.use(require('@neilsustc/markdown-it-katex'))
  },
  define: {
    __BASE__: "/repo/",
    __AUTHOR__: 'avatar',
    __AVATAR__: 'avatar.png',
    __SOCIAL_MEDIA__: [
      {
        name: 'email',
        logo: 'email.svg',
        url: 'mailto:[example]@gmail.com'
      },
      {
        name: 'github',
        logo: 'github.svg',
        url: 'https://github.com/[username]'
      },
      {
        name: 'juejin',
        logo: 'juejin.svg',
        url: 'https://juejin.cn/user/[userid]/posts'
      },
      {
        name: 'dribbble',
        logo: 'dribbble.svg',
        url: 'https://dribbble.com/[username]'
      },
      {
        name: 'twitter',
        logo: 'twitter.svg',
        url: 'https://twitter.com/[username]'
      },
      {
        name: 'weibo',
        logo: 'weibo.svg',
        url: 'https://weibo.com/[username]'
      },
    ],
    __HOME_NAME_LINK__: 'https://www.google.com/',
    __CLASSIFICATIONS__: ['All', 'folder1', 'folder2'],
    __FOLDERS__: ['folder1', 'folder2'],
    __FOOTER_AVATAR_LINK__: 'https://www.google.com/',
  },
}