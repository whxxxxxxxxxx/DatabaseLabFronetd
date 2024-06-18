import { request } from "@/utils"
// 1. 登录请求

export function publishProductApi (formData) {
  return request({
    url: '/product',
    method: 'POST',
    data: formData
  })
}

export function getProductListApi (formData) {
  return request({
    url: '/product/list',
    method: 'POST',
    data: formData
  })
}

export function deleteProductApi (id) {
  return request({
    url: `/product/${id}`,
    method: 'DELETE',
  })
}

export function getProductDetailApi (id) {
  return request({
    url: `/product/${id}`,
    method: 'GET',
  })
}

export function updateProductApi (formData) {
  return request({
    url: `/product/${formData.idData}`,
    method: 'PUT',
    data: formData
  })
}