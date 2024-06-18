// 用户相关的所有请求
import { request } from "@/utils"
// 1. 登录请求

export function loginAPI (formData) {
  return request({
    url: '/users/login',
    method: 'POST',
    data: formData
  })
}

export function UpdateProfileAPI (formData) {
  return request({
    url: '/users/info',
    method: 'PUT',
    data: formData
  })
}


export function RegisterAPI (formData) {
  return request({
    url: '/users/register',
    method: 'POST',
    data: formData
  })
}

export function getProfileAPI () {
  return request({
    url: '/users/info',
    method: 'GET'
  })
}

