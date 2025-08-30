const userModel = require('../models/user.model');
exports.index = (req, res) => {
  const users = userModel.findAll();
  res.render('index', {
    title: 'User List',
    users
  });
}
exports.show = (req, res) => {
  const user = userModel.findById(parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.render('user', {
    title: `User ${user.name}`,
    user
  });
}
exports.create = (req, res) => {
  const newUser = userModel.create(req.body);
  res.status(201).json(newUser);
}
exports.update = (req, res) => {
  const updatedUser = userModel.update(parseInt(req.params.id, 10), req.body);
  if (!updatedUser) {
    return res.status(404).send('User not found');
  }
  res.json(updatedUser);
}
exports.delete = (req, res) => {
  const deletedUser = userModel.delete(parseInt(req.params.id, 10));
  if (!deletedUser) {
    return res.status(404).send('User not found');
  }
  res.status(204).send();
}
