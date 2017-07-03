import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Problem from '@/components/Problem'
import Todo from '@/components/Todo'
import Modal from '@/components/Modal'
import demoCode from '@/components/demoCode'
import manageTasks from '@/components/manageTasks'
import message1 from '@/components/message1'
import message2 from '@/components/message2'
import UseElement from '@/components/UseElement'
import Demo from '@/components/Demo'
import LogInFootLog from '@/components/LogInFootLog'
import CheckForm from '@/components/CheckForm'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/problem',
      name: 'Problem',
      component: Problem
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/Demo',
      name: 'demoCode',
      component: demoCode
    },
    {
      path: '/runIt',
      name: 'manageTasks',
      component: manageTasks
    },
    {
      path: '/todo1',
      name: 'message1',
      componet: message1
    },
    {
      path: '/modal2',
      name: 'message2',
      component: message2
    },
    {
      path: '/useElement',
      name: 'UseElement',
      component: UseElement
    },
    {
      path: '/demoInput',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/logInFootLog',
      name: 'LogInFootLog',
      component: LogInFootLog
    },
    {
      path: '/checkForm',
      name: '/CheckForm',
      component: CheckForm
    }
  ]
})
