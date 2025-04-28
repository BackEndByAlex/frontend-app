const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!\u00a7()_?]).{12,}$/

const passwordsToTest = [
  'Forest.Path88!',
  'Adventure!123Q',
  'Weakpass1!',
  'Short1!',
  'StrongPassw0rd!'
]

passwordsToTest.forEach(password => {
  const isStrong = strongPasswordRegex.test(password)
  console.log(`Password: "${password}" --> ${isStrong ? '✅ Starkt' : '❌ Svagt'}`)
})
