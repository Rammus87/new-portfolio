import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import RoutesConfig from './config'
import store from '@/store/index'

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox
  }
  //MainBox的嵌套,後續動態添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name === "login"){
    next()
  }else{
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      if(!store.state.isGetterRouter){
        ConfigRouter()
        next({
        path:to.fullPath
      })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter = ()=>{
  RoutesConfig.forEach(item=>{
    router.addRoute("mainbox",item)
  })
  store.commit("changeGetterRouter",true)
}
//之後直接在config新增就好

export default router
