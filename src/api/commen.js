import { instance } from '@/utils/request.js'

// 获取文章评论
export const getCommon = params => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 对评论点赞
export const likings = target => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消对评论点赞
export const deleteLikings = target => {
  return instance({
    method: 'DELETE',
    url: '/app/v1_0/comment/likings/' + target
  })
}

// 添加评论
export const addComments = data => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
