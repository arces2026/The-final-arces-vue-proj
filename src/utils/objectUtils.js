// src/utils/objectUtils.js

/**
 * Safely gets a nested value from an object using dot notation path
 *
 * @param {Object} obj - The object to traverse
 * @param {string} path - The dot notation path (e.g., 'user.address.city')
 * @returns {any} - The value at the path, or undefined if not found
 *
 * @example
 * const obj = { user: { address: { city: 'New York' } } }
 * getNestedValue(obj, 'user.address.city') // Returns 'New York'
 */
export const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

/**
 * Recursively extracts all nested key paths from an object using dot notation
 *
 * @param {Object} obj - The object to traverse and extract keys from
 * @param {string} prefix - The current path prefix (used internally for recursion)
 * @returns {string[]} Array of all nested key paths
 *
 * @example
 * const data = { user: { name: 'John', address: { city: 'NYC' } } }
 * getAllKeys(data) // Returns: ['user.name', 'user.address', 'user.address.city']
 */
export const getAllKeys = (obj, prefix = '') => {
  let keys = []

  if (!obj || typeof obj !== 'object') {
    return keys
  }

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }

  return keys
}
