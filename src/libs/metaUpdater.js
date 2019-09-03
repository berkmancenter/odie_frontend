import router from '../router'

router.afterEach(route => {
  document.title = route.meta.title
  // Remove any stale meta tags
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  route.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag))
})
