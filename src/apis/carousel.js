import httpInstance from '../utils/http'

export function getCarouselApi() {
  return httpInstance({
    url: '/api/caro'
  })
}

