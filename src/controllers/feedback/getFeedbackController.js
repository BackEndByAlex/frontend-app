/**
 * Retrieves all feedback from the authentication service.
 *
 * @returns {Promise<object>} - A promise that resolves to the feedback data.
 */
export const getFeedbackFromAuth = async () => {
  const res = await fetch('http://auth:4000/api/v1/feedback-get-all')
  const data = await res.json()
  return data
}
