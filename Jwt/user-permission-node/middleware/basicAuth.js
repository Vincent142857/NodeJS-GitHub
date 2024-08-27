const { users } = require('../data');

const findUser = (userId) => {
  return users.find(u => u.id === userId);
}

//middleware - isExist user
const authUser = (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json('You need sign in!');
  }
  const user = findUser(userId);
  if (!user) {
    return res.status(404).json('User not found');
  }
  req.user = user;
  next();
}

//middleware - check role
const authPage = (permission) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!permission.includes(role)) {
      return res.status(401).json('You don not have permission!')
    }
    next();
  }
}

//middleware - find course
const authCourse = (req, res, next) => {
  const { number } = req.params;
  const { courses } = req.user;
  if (!courses.includes(+number)) {
    return res.status(404).json("Course Not found");
  }
  next();
}


module.exports = {
  authPage,
  authCourse,
  authUser
}