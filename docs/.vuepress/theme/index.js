const { path } = require('@vuepress/utils')

module.exports = {
  name: 'vuepress-theme-two-dish-cat-fish',
  extends: '@vuepress/theme-default',
  layouts: {
    HomeLayout: path.resolve(__dirname, 'layouts/HomeLayout.vue'),
    ClassificationLayout: path.resolve(__dirname, 'layouts/ClassificationLayout.vue'),
    FolderLayout: path.resolve(__dirname, 'layouts/FolderLayout.vue'),
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}