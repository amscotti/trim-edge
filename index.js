const DEFAULT = { pre: false, post: false }

/**
 * Trims the specified target string from the start or end of the input string, depending on the provided options.
 *
 * @param {string} str - The input string.
 * @param {string} target - The target string to remove.
 * @param {Object} [options={ pre: false, post: false }] - Options to determine whether to trim from the start (pre) or end (post).
 * @param {boolean} [options.pre=false] - Whether to trim target from the start of the input string.
 * @param {boolean} [options.post=false] - Whether to trim target from the end of the input string.
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
   * @param {Object} [options={ pre: false, post: false }] - Options to determine whether to trim from the start (pre) or end (post).
   * @param {boolean} [options.pre=false] - Whether to trim target from the start.
   * @param {boolean} [options.post=false] - Whether to trim target from the end.
   * @returns {function(string): string} A function that takes an input string and returns the result string after trimming.
   */
export const createTrimEdgeFn = (target, options = DEFAULT) => {
  return (str) => trimEdge(str, target, options)
}
