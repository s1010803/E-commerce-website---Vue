import httpInstance from '../utils/http'

export function getHotApi() {
  return httpInstance({
    url: '/api/hot'
  })
}