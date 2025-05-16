import httpInstance from "../utils/http";

export function getProductDetail(id) {
  return httpInstance({
    url: `/api/Products/${id}`,
  });
}