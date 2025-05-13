if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('SW registrerad:', reg.scope))
      .catch(err => console.error('SW misslyckades:', err))
  })
}
