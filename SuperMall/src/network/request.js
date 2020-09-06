import axios from "axios"

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL:"",//此处设置服务器urlj接口
    timeout:10*1000
  })
  //2.axios拦截器的使用
  //2.1请求拦截器的作用
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err)
  })
  //2.2响应拦截器
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
  //3.返回真正请求
  return instance(config)
}
