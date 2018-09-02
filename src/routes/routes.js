export default [
  {
    path: '/reg',
    component: resolve => require(['@/components/backEnd/Reg'],resolve),
    meta: { auth: false }
  },

  {
    path: '/login',
    component: resolve => require(['@/components/backEnd/Login'],resolve),
    meta: { auth: false }
  },

  {
    //前台路由
    path: '/',
    component: resolve => require(['@/components/fronted/Front'],resolve),
    children: [
      { 
        path: '', 
        redirect: 'about', 
        meta: { auth: false } 
      },
      { 
        path: 'about', 
        component: resolve => require(['@/components/fronted/About'],resolve),
        meta: { auth: false } 
      },
      { 
        path: 'record', 
        component: resolve => require(['@/components/fronted/Record'],resolve),
        meta: { auth: false } 
      },
      {
        path: 'project',
        component: resolve => require(['@/components/fronted/Project'],resolve),
        meta: { auth: false }
      },
      { 
        path: 'article/:id', 
        component: resolve => require(['@/components/fronted/Article'],resolve),
        meta: { auth: false, scrollToTop: true } 
      },
    ]
  },
  
  {
    // 后台路由
    path: '/admin',
    component: resolve => require(['@/components/backEnd/Admin'],resolve),
    children: [
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: '',
        redirect: 'articleList'
      },
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: 'articleList',
        component: resolve => require(['@/components/backEnd/ArticleList'],resolve),
        name: '文章管理'
      },
      {
        // 创建文章单独一个组件
        path: 'articleCreate',
        component: resolve => require(['@/components/backEnd/ArticleCreate'],resolve),
        name: '创建文章'
      },
      {
        path: 'articleEdit/:articleId',
        component: resolve => require(['@/components/backEnd/ArticleEdit'],resolve),
        name: "编辑文章"
      },
      {
        path: 'classList',
        component: resolve => require(['@/components/backEnd/ClassList'],resolve),
        name: '分类管理'
        // 创建分类直接在分类列表里面出现弹层
      },
      {
        path: 'projsList',
        component: resolve => require(['@/components/backEnd/ProjsList'],resolve),
        name: '项目管理'
      }
    ]
  },
  {
    path: '*', 
    component: resolve => require(['@/components/NotFound'],resolve),
  }
  //

  // {path:'/404',component:NotFound}
]
