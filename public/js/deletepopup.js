document.addEventListener('DOMContentLoaded', () => {
  const deleteModal = document.getElementById('delete-modal')
  const finalDeleteModal = document.getElementById('final-delete-modal')

  document.getElementById('open-delete-modal')
    .addEventListener('click', () => {
      deleteModal.classList.remove('hidden')
    })

  document.getElementById('cancel-delete-first')
    .addEventListener('click', () => {
      deleteModal.classList.add('hidden')
    })

  document.getElementById('confirm-delete-first')
    .addEventListener('click', () => {
      deleteModal.classList.add('hidden')
      finalDeleteModal.classList.remove('hidden')
    })

  document.getElementById('cancel-delete-final')
    .addEventListener('click', () => {
      finalDeleteModal.classList.add('hidden')
      deleteModal.classList.remove('hidden')
    })
})
