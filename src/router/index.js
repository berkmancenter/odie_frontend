import Vue from 'vue'
import Router from 'vue-router'

// @TODO Just a temporary solution, we don't want to preload it, but the pace.js
// loader lib doesn't seem to like the async router loader...
import Layout from '@/layouts/Default'
import Home from '@/components/Home/Index'
import Cohorts from '@/components/Cohorts/Index'
import Cohort from '@/components/Cohort/Index'
import Builder from '@/components/Builder/Index'
import CohortsSet from '@/components/CohortsSet/Index'
import CohortsSets from '@/components/CohortsSets/Index'
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
          path: '/cohorts',
          name: 'cohorts.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Cohorts',
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
          component: Cohorts
        },
        {
          path: '/cohort/:cohort_id',
          name: 'cohort.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Cohort',
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
          component: Cohort
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
          path: '/cohorts-set',
          name: 'cohorts-set.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Cohort',
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
          component: CohortsSet
        },
        {
          path: '/cohorts-sets',
          name: 'cohorts-sets.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Cohorts',
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
          component: CohortsSets
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
