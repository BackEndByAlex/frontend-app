import { onDomReady } from './utils.js'

onDomReady(() => {
  const copyButton = document.querySelector('#copy-password')
  const toggleEyeButton = document.querySelector('#toggle-password-visibility')
  const passwordInput = document.querySelector('#generated-password')
  const generateButton = document.querySelector('#generate-password')

  if (copyButton && passwordInput) {
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
          if (toggleEyeButton) {
            toggleEyeButton.classList.add('blink-animation')
            setTimeout(() => {
              toggleEyeButton.classList.remove('blink-animation')
            }, 600)
          }
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

  if (generateButton && passwordInput) {
    generateButton.addEventListener('click', async () => {
      try {
        const res = await fetch('/TimeLock/generate-password')
        const data = await res.json()
        passwordInput.value = data.password
        passwordInput.type = 'password'
      } catch (err) {
        console.error('Kunde inte generera lösenord:', err)
      }
    })
  }

  if (toggleEyeButton && passwordInput) {
    toggleEyeButton.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
      } else {
        passwordInput.type = 'password'
      }
    })
  }
})
