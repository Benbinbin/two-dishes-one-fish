/**
 * refer to @vuepress/plugin-git: https://www.npmjs.com/package/@vuepress/plugin-git
 */
 const execa = require('execa')

 /**
  * Check if the git repo is valid
  */
 const checkGitRepo = (cwd) => {
   try {
     execa.commandSync('git log', { cwd })
     return true
   } catch {
     return false
   }
 }
 
 const getUpdatedTime = async (filePath, cwd) => {
   const { stdout } = await execa(
     'git',
     ['--no-pager', 'log', '-1', '--format=%at', filePath],
     {
       cwd,
     }
   )
 
   return Number.parseInt(stdout, 10) * 1000
 }
 
 const getCreatedTime = async (filePath, cwd) => {
   const { stdout } = await execa(
     'git',
     ['--no-pager', 'log', '--diff-filter=A', '--format=%at', filePath],
     {
       cwd,
     }
   )
 
   return Number.parseInt(stdout, 10) * 1000
 }
 
 const addTime = {
   name: 'vuepress-plugin-addTime',
   async extendsPageOptions(options, app) {
     if (options.filePath) {
       filePath = options.filePath;
       const cwd = app.dir.source()
       const isGitRepoValid = checkGitRepo(cwd)
 
       let createdTime = null;
       let updatedTime = null;
 
       if (isGitRepoValid) {
         createdTime = await getCreatedTime(filePath, cwd)
         updatedTime = await getUpdatedTime(filePath, cwd)
       }
 
       return {
         frontmatter: {
           createdTime,
           updatedTime
         },
       }
     } else {
       return {}
     }
 
   }
 }
 
 module.exports = addTime