/**
 * Interface for the options object
 *
 * @typedef {Object} Options
 * @property {boolean} [pre] - Whether to trim from start
 * @property {boolean} [post] - Whether to trim from end
*/

/**
 * @type { {
  POST_ONLY: Options,
  PRE_ONLY: Options,
  BOTH: Options,
  NONE: Options,
}}
*/
export const OPTIONS = {
  POST_ONLY: { pre: false, post: true },
  PRE_ONLY: { pre: true, post: false },
  BOTH: { pre: true, post: true },
  NONE: { pre: false, post: false }
}

const DEFAULT = OPTIONS.BOTH

/**
 * Trims the specified target string from the start or end of the input string, depending on the provided options.
 *
 * @param {string} str - The input string.
 * @param {string} target - The target string to remove.
 * @param {Options} [options] - Options to determine whether to trim from the start (pre) or end (post).
 * @returns {string} The result string after trimming.
 */
export function trimEdge (str, target, options = DEFAULT) {
  let result = str

  if (!target || target.length === 0 || (!options?.pre && !options?.post)) {
    return result
  }

  if (options.pre && str.startsWith(target)) {
    result = result.slice(target.length)
  }

  if (options.post && str.endsWith(target)) {
    result = result.slice(0, -target.length)
  }

  return result
}

/**
   * Creates a function that trims the specified target string from the start or end of any provided string.
   *
   * @param {string} target - The target string to remove.
   * @param {Options} [options] - Options to determine whether to trim from the start (pre) or end (post).
   * @returns {(str: string) => string}  A function that takes an input string and returns the result string after trimming.
   */
export const createTrimEdgeFn = (target, options = DEFAULT) => {
  return (str) => trimEdge(str, target, options)
}
