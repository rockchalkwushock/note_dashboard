/**
 * Many thanks to @EQuimper for the following method:
 * Can be found at:
 * https://github.com/EQuimper/nodejs-api-boilerplate/blob/master/src/utils/filteredBody.js
 */

/**
 * Filters the req.body object so only the specified
 * keys are provided to our controllers.
 *
 * Added security to protect against malicious code that
 * could be injected into req.body object.
 *
 * @param {Object} body - Request body
 * @param {Array[String]} whitelist - list of keys allowed to be passed through.
 * @returns {Object} body - Request body filtered
 */
export const filterBody = (body, whitelist) => {
  const items = {};

  Object.keys(body).forEach(key => {
    if (whitelist.indexOf(key) >= 0) {
      items[key] = body[key];
    }
  });
  return items;
}
