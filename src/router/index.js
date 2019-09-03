import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/Default'),
      children: [
        {
          path: '/',
          name: 'home.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer',
            metaTags: [
              {
                name: 'description',
                content: 'home description'
              },
              {
                property: 'og:description',
                content: 'home description'
              }
            ]
          },
          component: () => import('@/components/Home/Index')
        },
        {
          path: '404',
          name: 'pagenotfound.index',
          meta: {
            title: 'ODIE - 404',
            metaTags: [
              {
                name: 'description',
                content: 'page not found'
              },
              {
                property: 'og:description',
                content: 'page not found'
              }
            ]
          },
          component: () => import('@/components/PageNotFound/Index')
        },
        {
          path: '*',
          redirect: '404'
        }
      ]
    }
  ]
})
