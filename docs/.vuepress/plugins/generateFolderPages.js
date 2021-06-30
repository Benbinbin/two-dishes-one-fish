const { createPage } = require('@vuepress/core');

const generateFolderPages = (options, app) => {
  let postFolders = {}
  options.postFolders.forEach(folder => {
    postFolders[folder] = {
      posts: [],
      tags: []
    }
  })

  return {
    name: 'vuepress-plugin-generateFolderPages',
    async onInitialized(app) {
      // rearrange posts to different folder
      app.pages.forEach((page) => {
        let folder = '';
        if (page.filePathRelative) {
          folder = page.filePathRelative.split("/")[0]
          if (!(folder in postFolders)) return
        } else {
          return
        }

        const post = {
          key: page.key,
          title: page.title,
          path: page.path,
          pathRelative: page.htmlFilePathRelative,
          filePathRelative: page.filePathRelative,
          tags: page.frontmatter.tags || [],
          createdTime: page.frontmatter.createdTime || null,
          updatedTime: page.frontmatter.updatedTime || null,
          date: page.frontmatter.date || null,
          collection: page.frontmatter.collection || '',
          collectionOrder: page.frontmatter.collectionOrder || 0,
        }

        postFolders[folder].posts.push(post);
        postFolders[folder].tags = [...new Set([...postFolders[folder].tags, ...post.tags])]
      })

      // add folder navigation pages
      let folderOptions = [];

      options.postFolders.forEach(item => {
        folderOptions.push({
          path: `/folderslist/${item}`,
          frontmatter: {
            layout: 'FolderLayout',
            folder: item
          }
        })
      })

      // create folder pages
      let folderPagesPromise = []
      folderOptions.forEach(option => {
        folderPagesPromise.push(createPage(app, option))
      })

      const folderPages = await Promise.all(folderPagesPromise)

      folderPages.forEach(page => {
        app.pages.push(page)
      });

    },
    extendsPageData: (page, app) => {
      // add data to each folder navigation pages
      if (page.frontmatter.folder) {
        return {
          postsData: postFolders[page.frontmatter.folder]
        }
      } else {
        return {}
      }
    },
  }
}

module.exports = generateFolderPages