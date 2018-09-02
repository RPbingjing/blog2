import Reg from '@/components/backEnd/reg/ui';
import Login from '@/components/backEnd/login/ui';

import Admin from '@/components/backEnd/admin/ui';
import ArticleCreate from '@/components/backEnd/articleCreate/ui'
import ArticleList from '@/components/backEnd/articleList/ui'
import ArticleEdit from '@/components/backEnd/articleEdit/ui'
import ClassList from '@/components/backEnd/classList/ui'

import Home from '@/components/fronted/home/ui';
import Front from '@/components/fronted/front/ui';
import About from '@/components/fronted/about/ui';
import Tags from '@/components/fronted/tags/ui';
import Article from '@/components/fronted/article/ui';
import Project from '@/components/fronted/project/ui';

import NotFound from '@/components/notFound/ui'

export default [
  {
    path: '/reg',
    component: Reg,
    meta: { auth: false }
  },

  {
    path: '/login',
    component: Login,
    meta: { auth: false }
  },

  {
    //前台路由
    path: '/',
    component: Front,
    children: [
      { 
        path: '', 
        redirect: 'home', 
        meta: { auth: false } 
      },
      { 
        path: 'home', 
        component: Home, 
        meta: { auth: false } 
      },
      { 
        path: 'about', 
        component: About, 
        meta: { auth: false } 
      },
      { 
        path: 'tags', 
        component: Tags, 
        meta: { auth: false } 
      },
      {
        path: 'project',
        component: Project,
        meta: { auth: false }
      },
      { 
        path: 'article/:id', 
        component: Article, 
        meta: { auth: false, scrollToTop: true } 
      },
    ]
  },
  
  {
    // 后台路由
    path: '/admin',
    component: Admin,
    children: [
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: '',
        redirect: 'articleList'
      },
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: 'articleList',
        component: ArticleList,
        name: '文章管理'
      },
      {
        // 创建文章单独一个组件
        path: 'articleCreate',
        component: ArticleCreate,
        name: '创建文章'
      },
      {
        path: 'articleEdit/:articleId',
        component: ArticleEdit,
        name: "编辑文章"
      },
      {
        path: 'classList',
        component: ClassList,
        name: '分类管理'
        // 创建分类直接在分类列表里面出现弹层
      }
    ]
  },
  {
    path: '*', 
    component: NotFound
  }
  //

  // {path:'/404',component:NotFound}
]
