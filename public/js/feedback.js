document.querySelector('[data-feedback-form]')?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const msg = document.querySelector('[data-feedback-input]').value.trim()
  const csrf = document.querySelector('#csrfToken')?.value

  if (!msg || !csrf) return

  try {
    await fetch('./feedback/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrf
      },
      body: JSON.stringify({ message: msg })
    })

    location.reload()
  } catch (err) {
    console.error('Fel vid skickande av feedback:', err)
  }
})
