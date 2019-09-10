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
          path: '/media-sources',
          name: 'media-sources.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Media Sources',
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
          component: () => import('@/components/MediaSources/Index')
        },
        {
          path: '/media-source/:media_source_id',
          name: 'media-source.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Media Source',
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
          props: true,
          component: () => import('@/components/MediaSource/Index')
        },
        {
          path: '/builder',
          name: 'builder.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Builder',
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
          props: true,
          component: () => import('@/components/Builder/Index')
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
