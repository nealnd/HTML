import axios from "axios";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
  })

  httpInstance.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    // // 2. 按照后端的要求拼接token数据
     const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
     }
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
  
    const userStore=useUserStore()
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    if(e.response.status===401){
      userStore.clearUserInfo()
      router.replace({path:'/login'})
    }

    return Promise.reject(e)
  })

  export default httpInstance