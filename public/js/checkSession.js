setInterval(async () => {
  try {
    const res = await fetch('/check-session', { credentials: 'include' })
    if (res.status === 401) {
      alert('Du har blivit automatiskt utloggad.')
      window.location.href = '/login'
    }
  } catch (err) {
    console.error('Session check failed', err)
    window.location.href = '/login'
  }
}, 15 * 60 * 1000)
