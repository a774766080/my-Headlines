import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import jsonBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})
// 请求拦截器
instance.interceptors.request.use(config => {
  if (store.state.user && store.state.user.token) {
    const Token = store.state.user.token
    config.headers.Authorization = 'Bearer ' + Token
  }
  return config
})

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
  switch (err.response.status) {
    case 400:
      return Toast('请求参数错误')
    case 500:
      return Toast('服务器错误')
  }
})

export { instance }
