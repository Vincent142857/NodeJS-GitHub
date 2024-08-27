const ROLE = ['ADMIN', 'MOD', 'STU'];

const users = [
  { id: 1, name: 'CR7', courses: [1, 2, 3], role: 'ADMIN' },
  { id: 2, name: 'M10', courses: [1, 2, 5], role: 'MOD' },
  { id: 3, name: 'RN9', courses: [1, 4, 8], role: 'STU' }
]

module.exports = {
  ROLE,
  users
}