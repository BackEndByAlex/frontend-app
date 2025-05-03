/**
 * Waits until the DOM is fully loaded and then runs the callback.
 *
 * @param {Function} callback - The function to run when DOM is ready.
 */
export function onDomReady (callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

/**
 * Sends a POST request with JSON data.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} data - The body data to send.
 * @returns {Promise<Response>} - The fetch response.
 */
export async function postJson (url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })

  return response
}
