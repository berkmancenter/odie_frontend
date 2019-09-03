import router from '../router'

router.afterEach(route => {
  window.scrollTo(0, 0)
})
