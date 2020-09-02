import Vue from 'vue'
import Router from 'vue-router'

// @TODO Just a temporary solution, we don't want to preload it, but the pace.js
// loader lib doesn't seem to like the async router loader...
import Layout from '@/layouts/Default'
// import Home from '@/components/Home/Index'
// import Cohorts from '@/components/Cohorts/Index'
// import Cohort from '@/components/Cohort/Index'
// import Builder from '@/components/Builder/Index'
// import CohortsSet from '@/components/CohortsSet/Index'
// import CohortsSets from '@/components/CohortsSets/Index'
// import AboutUs from '@/components/AboutUs/Index'
// import Contact from '@/components/Contact/Index'
// import Compare from '@/components/Compare/Index'
import PageNotFound from '@/components/PageNotFound/Index'
import Compare from '@/components/Compare_V2/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: 'compare'
        },
        {
          path: 'compare',
          name: 'compare.index',
          meta: {
            title: 'ODIE - Online Discourse Insight Explorer - Compare Cohorts',
            metaTags: [
              {
                name: 'description',
                content: 'compare description'
              },
              {
                property: 'og:description',
                content: 'compare description'
              }
            ]
          },
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
