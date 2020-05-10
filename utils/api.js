import http from '@/plugins/http'
const baseUrl = process.env.baseUrl
function getStatic(params) {
  return http({
    url: `${baseUrl}/api/v1/static`,
    method: 'get',
    params
  })
}
function getTitle(params) {
  return http({
    url: `${baseUrl}/api/v1/title`,
    method: 'get',
    params
  })
}
function getArticle(params) {
  return http({
    url: `${baseUrl}/api/v1/article/${params.id}`,
    method: 'get'
  })
}
export { getStatic,getTitle,getArticle }