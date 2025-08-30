// @ts-ignore
let express = require('express');
const { param, validationResult, query, matchedData } = require('express-validator');
const users = require('../data/users.list');
let router = express.Router();

router.get('/:userId', param("userId").isInt(), (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const userId = req.params.userId;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send({
      user: user,
    });
  }
});

router.get('/', query("search").optional().trim().notEmpty(), (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  let filteredUsers = users;
  // const search = req.query.search;
  const search = matchedData(req).search;


  if (search !== undefined) {
    filteredUsers = filteredUsers.filter((user) => {
      return user.fullName.toLowerCase().includes(search.toLowerCase());
    });
  }
  res.send({
    users: filteredUsers,
  });
});


router.post("/", (req, res, next) => {
  const user = req.body;
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

  users.push({
    id: maxId + 1,
    ...user
  });
  res.status(201).send({
    user: user
  });
})

module.exports = router;