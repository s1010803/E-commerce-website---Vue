import httpInstance from "../utils/http";

export function getAllProductsApi() {
  return httpInstance({
    url: '/api/allProducts',
  });
}