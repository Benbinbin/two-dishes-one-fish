import { defineClientAppEnhance } from '@vuepress/client'
import HomeLayout from './layout/HomeLayout.vue'
import ClassificationLayout from './layout/ClassificationLayout.vue'
import FolderLayout from './layout/FolderLayout.vue'

export default defineClientAppEnhance(({ app }) => {
    app.component('HomeLayout', HomeLayout)
    app.component('ClassificationLayout', ClassificationLayout)
    app.component('FolderLayout', FolderLayout)
})