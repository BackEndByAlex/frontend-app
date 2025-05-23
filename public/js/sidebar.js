document.querySelectorAll('.sidebar-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target

    document.querySelectorAll('.dashboard-section').forEach(section => {
      section.classList.remove('active')
    })

    const target = document.getElementById(targetId)
    if (target) target.classList.add('active')
  })
})
