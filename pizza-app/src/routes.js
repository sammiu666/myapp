import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/about/About'
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
  {path: '/',name:'home',components:{
    default:Home,
    'orderingGuide':OrderingGuide,
    'delivery': Delivery,
    'history': History
  }},
  {path: '/menu',name:'menu',component:Menu},
  {path: '/admin',name:'admin',component:Admin,
  },
  {path: '/login',name:'login',component:Login},
  {path: '/register',name:'register',component:Register},
  {path: '/about',name:'about',redirect:'/about/contact',component:About,children:[
    {path: '/about/contact',name:'contactLink',redirect:'/about/contact/phone',component:Contact,children:[
      {path:'/about/contact/phone',name:'phone',component:Phone},
      {path:'/about/contact/personName',name:'personName',component:PersonName},
    ]},
    {path: '/about/Delivery',name:'deliveryLink',component:Delivery},
    {path: '/about/History',name:'historyLink',component:History},
    {path: '/about/OrderingGuide',name:'orderingGuideLink',component:OrderingGuide},
  ]
  },
  {path: '*',redirect:'/'}
]