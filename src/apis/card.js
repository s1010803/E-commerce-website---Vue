import httpInstance from "../utils/http";

export function getCardApi(category = '') {
  return httpInstance({
    url: '/api/card',
    params: category ? { category } : {}
  });
}