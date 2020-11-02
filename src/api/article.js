import { instance } from '@/utils/request.js'

// 获取文章列表信息
export const articles = params => {
  return instance({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 频道列表

export const channel = params => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/channels',
    params
  })
}
// 编辑修改频道列表
export const editChannel = channels => {
  return instance({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}
// 删除用户频道列表
export const deleteChannel = id => {
  return instance({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}

/**
 * 根据 id 获取指定文章
 */
export const getArticleById = articleId => {
  return instance({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect = target => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteCollect = articleId => {
  return instance({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 点赞文章
export const likeAttitude = target => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞文章
export const deleteAttitude = articleId => {
  return instance({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
