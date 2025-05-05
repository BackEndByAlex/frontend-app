import fetch from 'node-fetch'

export const sendFeedbackToAuth = async (req, res) => {
  const { message } = req.body
  console.log('Skickar feedback:', message)  // ← logga detta
  await fetch('http://auth:4000/api/v1/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  res.redirect('./')
}

export const getFeedbackFromAuth = async () => {
  const res = await fetch('http://auth:4000/api/v1/feedback-get-all')
  const data = await res.json()
  console.log('Feedback:', data)
  return data
}
