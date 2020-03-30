import http from '@/plugins/http'
const baseUrl = 'http://www.boatng.cn:7002'
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
export { getStatic,getTitle }