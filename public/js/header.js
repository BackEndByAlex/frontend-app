import { onDomReady } from './utils.js'

onDomReady(() => {
  const toggle = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.header-nav')
  toggle?.addEventListener('click', () => {
    nav.classList.toggle('nav-open')
  })
})
