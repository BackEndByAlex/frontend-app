import { onDomReady } from './utils.js'

onDomReady(() => {
  const copyButton = document.getElementById('copy-password')
  const toggleEyeButton = document.getElementById('toggle-password-visibility')
  const passwordInput = document.getElementById('generated-password')

  if (copyButton && passwordInput) {
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
          console.log('Lösenord kopierat!')

          // Gör att öga blinkar
          if (toggleEyeButton) {
            toggleEyeButton.classList.add('blink-animation')
            setTimeout(() => {
              toggleEyeButton.classList.remove('blink-animation')
            }, 600)
          }

          // Ändra kopieringsikonens färg tillfälligt
          copyButton.querySelector('svg').style.color = '#22c55e'
          setTimeout(() => {
            copyButton.querySelector('svg').style.color = ''
          }, 1500)
        })
        .catch(err => {
          console.error('Kunde inte kopiera:', err)
        })
    })
  }
})
