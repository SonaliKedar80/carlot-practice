/**
 * Splits a list into pages.
 *
 * @param {Array} items     the full list
 * @param {number} page     page number, starting at 1
 * @param {number} pageSize how many items per page
 */
export function paginate(items, page = 1, pageSize = 6) {
  const total = items.length;
  const totalPages = Math.floor(total / pageSize);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}
