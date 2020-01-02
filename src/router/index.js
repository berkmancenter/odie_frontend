import Vue from 'vue'
import Router from 'vue-router'

// @TODO Just a temporary solution, we don't want to preload it, but the pace.js
// loader lib doesn't seem to like the async router loader...
import Layout from '@/layouts/Default'
import Home from '@/components/Home/Index'
import MediaSources from '@/components/MediaSources/Index'
import MediaSource from '@/components/MediaSource/Index'
import Builder from '@/components/Builder/Index'
import MediaSet from '@/components/MediaSet/Index'
import MediaSets from '@/components/MediaSets/Index'
import AboutUs from '@/components/AboutUs/Index'
import Contact from '@/components/Contact/Index'
import Compare from '@/components/Compare/Index'
import PageNotFound from '@/components/PageNotFound/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
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
          component: Home
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
          component: MediaSources
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
          component: MediaSource
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
          component: Builder
        },
        {
          path: '/media-set',
          name: 'media-set.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Media Set',
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
          component: MediaSet
        },
        {
          path: '/media-sets',
          name: 'media-sets.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Media Sets',
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
          component: MediaSets
        },
        {
          path: '/about-us',
          name: 'about-us.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - About Us',
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
          component: AboutUs
        },
        {
          path: '/contact',
          name: 'contact.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Countac Us',
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
          component: Contact
        },
        {
          path: '/compare/:media_sources?',
          name: 'compare.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Compare',
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
          component: Compare
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
          component: PageNotFound
        },
        {
          path: '*',
          redirect: '404'
        }
      ]
    }
  ]
})
