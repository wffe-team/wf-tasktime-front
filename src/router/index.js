import Vue from 'vue'
import Router from 'vue-router'
//import Login from '@/components/Login'
//import Home from '@/components/Home'
//import Dashboard from '@/components/Dashboard'

//import UserList from '@/components/user/list'
//import ProjectList from '@/components/project/list'
//import WorkLogList from '@/components/worklog/list'
Vue.use(Router)

const Home = r=> require.ensure([], () => r(require('@/components/Home')), 'Home');
const UserList = r => require.ensure([], () => r(require('@/components/user/list')), 'UserList');
const ProjectList = r => require.ensure([], () => r(require('@/components/project/list')), 'ProjectList');
const WorkLogList = r => require.ensure([], () => r(require('@/components/worklog/list')), 'WorkLogList');

let router = new Router({
  //mode: 'history',
  routes: [
    // {
    //   path: '/login',
    //   name: '登录',
    //   component: Login
    // },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/dashboard',
    //   leaf: true, // 只有一个节点
    //   menuShow: true,
    //   iconCls: 'iconfont icon-home', // 图标样式class
    //   children: [
    //     {path: '/dashboard', component: Dashboard, name: '项目列表', menuShow: true}
    //   ]
    // },
    {
      path: '/',
      component: Home,
      redirect: '/worklog/list',
      children: [
        {
          path: '/worklog/list', 
          component: WorkLogList, 
          name: '总工时统计表',
        }
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/user/list', 
          component: UserList, 
          name: '个人工时记录', 
        }
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/project/list', 
          component: ProjectList, 
          name: '部门产品管理',
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
