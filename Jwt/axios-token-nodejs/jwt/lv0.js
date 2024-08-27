const JWT = require('jsonwebtoken');

const keySecret = 'abcxxxxxxxxx';

const payload = {
  userId: 1234,
  roles: ['admin']
}

const token = JWT.sign(payload, keySecret, {
  expiresIn: '2 days'
});

console.log(`sign token>>>`, token);

JWT.verify(token, keySecret, (error, decode) => {
  console.log(`decode>>>`, decode);
})