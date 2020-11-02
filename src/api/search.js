import { instance } from '@/utils/request.js'

// 获取搜索联想建议
export const getSuggestion = q => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索搜索结果
export const getResult = params => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
