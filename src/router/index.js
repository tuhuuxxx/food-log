import Vue from 'vue'
import Router from 'vue-router'
import LogInFootLog from '@/components/LogInFootLog'
import CheckForm from '@/components/CheckForm'

Vue.use(Router)

function requireAuth (to, from, next) {
  const token = window.localStorage.getItem('token')
  if (!token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LogInFootLog',
      component: LogInFootLog
    },
    {
      path: '/',
      name: 'CheckForm',
      component: CheckForm,
      beforeEnter: requireAuth
    }
  ]
})
