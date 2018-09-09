export default [
  {
    path: '/reg',
    component: resolve => require(['@/components/backEnd/reg/ui'],resolve),
    meta: { auth: false }
  },

  {
    path: '/login',
    component: resolve => require(['@/components/backEnd/login/ui'],resolve),
    meta: { auth: false }
  },

  {
    //前台路由
    path: '/',
    component: resolve => require(['@/components/fronted/front/ui'],resolve),
    children: [
      { 
        path: '', 
        redirect: 'about', 
        meta: { auth: false } 
      },
      { 
        path: 'about', 
        component: resolve => require(['@/components/fronted/about/ui'],resolve),
        meta: { auth: false } 
      },
      { 
        path: 'record', 
        component: resolve => require(['@/components/fronted/record/ui'],resolve),
        meta: { auth: false } 
      },
      {
        path: 'project',
        component: resolve => require(['@/components/fronted/project/ui'],resolve),
        meta: { auth: false }
      },
      { 
        path: 'article/:id', 
        component: resolve => require(['@/components/fronted/article/ui'],resolve),
        meta: { auth: false, scrollToTop: true } 
      },
    ]
  },
  
  {
    // 后台路由
    path: '/admin',
    component: resolve => require(['@/components/backEnd/admin/ui'],resolve),
    children: [
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: '',
        redirect: 'articleList'
      },
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: 'articleList',
        component: resolve => require(['@/components/backEnd/articleList/ui'],resolve),
        name: '文章管理'
      },
      {
        // 创建文章单独一个组件
        path: 'articleCreate',
        component: resolve => require(['@/components/backEnd/articleCreate/ui'],resolve),
        name: '创建文章'
      },
      {
        path: 'articleEdit/:articleId',
        component: resolve => require(['@/components/backEnd/articleEdit/ui'],resolve),
        name: "编辑文章"
      },
      {
        path: 'classList',
        component: resolve => require(['@/components/backEnd/classList/ui'],resolve),
        name: '分类管理'
        // 创建分类直接在分类列表里面出现弹层
      },
      {
        path: 'projsList',
        component: resolve => require(['@/components/backEnd/projsList/ui'],resolve),
        name: '项目管理'
      }
    ]
  },
  {
    path: '*', 
    component: resolve => require(['@/components/notFound/ui'],resolve),
    meta: { auth: false }
  }
  //

  // {path:'/404',component:NotFound}
]
