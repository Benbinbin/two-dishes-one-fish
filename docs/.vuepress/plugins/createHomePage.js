const { createPage } = require('@vuepress/core')

const createHomePage = (options, app) => {
  return {
    name: 'vuepress-plugin-createHomePage',
    async onInitialized(app) {
      // 如果主页不存在
      if (app.pages.every((page) => page.path !== '/')) {
        // 创建一个主页
        const homepage = await createPage(app, {
          path: '/',
          // 设置 frontmatter
          frontmatter: {
            layout: 'HomeLayout',
            cards: options.cards || []
          },
        })

        // 把它添加到 `app.pages`
        app.pages.push(homepage)
      }
    },
  }
}

module.exports = createHomePage