import request from '@/utils/request-node'

export function getArticle(params) {
  return request({
    url: 'getArticle',
    method: 'get',
    params
  })
}

export function articleAdd(params) {
  return request({
    url: 'articleAdd',
    method: 'post',
    data: params
  })
}

export function searchArticles(params) {
  return request({
    url: 'searchArticles',
    method: 'get',
    params
  })
}

