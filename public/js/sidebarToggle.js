document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle')
  const sidebar = document.querySelector('.sidebar')

  // Toggle menyn
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation() // Förhindrar att klicket räknas som "utanför"
    sidebar.classList.toggle('open')
  })

  // Klick INNE i sidebar ska inte stänga
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  // Klick någon annanstans stänger sidebar
  document.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open')
    }
  })
})
