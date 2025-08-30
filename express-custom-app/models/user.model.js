const users = [
  { id: 1, name: 'Alice', email: 'H6d9E@example.com' },
  { id: 2, name: 'Bob', email: '2jyHd@example.com' },
  { id: 3, name: 'Charlie', email: 'F0d8R@example.com' },
]

exports.findAll = () => users;
exports.findById = (id) => {
  return users.find(user => user.id === id);
};
exports.create = (user) => {
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return newUser;
};
exports.update = (id, userData) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  users[userIndex] = { ...users[userIndex], ...userData };
  return users[userIndex];
};
exports.delete = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  const deletedUser = users.splice(userIndex, 1);
  return deletedUser[0];
};
