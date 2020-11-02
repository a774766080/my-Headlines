import { instance } from '@/utils/request.js'

// 登录请求
export const login = data => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 验证码请求
export const codes = data => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + data
  })
}
// 获取个人信息
export const users = () => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取频道列表信息
export const channels = () => {
  return instance({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 关注用户
export const addFollowed = target => {
  return instance({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteFollowed = target => {
  return instance({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + target
  })
}
