import request from '@/utils/request-node'

export function getCataLogList(params) {
  return request({
    url: 'getCatalogList',
    method: 'get',
    params
  })
}

export function addCataLog(params) {
  return request({
    url: 'catalogAdd',
    method: 'post',
    data: params
  })
}

export function catalogUpdateTitle(params) {
  return request({
    url: 'catalogUpdateTitle',
    method: 'post',
    data: params
  })
}

export function subCatalogUpdateTitle(params) {
  return request({
    url: 'subCatalogUpdateTitle',
    method: 'post',
    data: params
  })
}

export function catalogDelete(params) {
  return request({
    url: 'catalogDelete',
    method: 'post',
    data: params
  })
}

export function subcatalogDelete(params) {
  return request({
    url: 'subcatalogDelete',
    method: 'post',
    data: params
  })
}
