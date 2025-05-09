import httpInstance from "../utils/http";

/**
 * @param {string} category - 分類，如 'clothes' 或 'accessories'
 * @param {number} page - 第幾頁（預設第 1 頁）
 * @param {number} limit - 每頁幾筆（預設 12 筆）
 */
export function getCardApi(category = '', page = 1, limit = 12) {
  return httpInstance({
    url: '/api/card',
    params: {
      ...(category && { category }),
      page,
      limit
    }
  });
}
