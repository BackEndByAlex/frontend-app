setInterval(async () => {
  try {
    const res = await fetch('./check-session', { credentials: 'include' })
    if (res.status === 401) {
      alert('Session expired')
      window.location.href = '../login'
    }
  } catch (err) {
    console.error('Session check failed', err)
    window.location.href = '../login'
  }
}, 1000 * 60 * 15) // Check every 15 minutes
