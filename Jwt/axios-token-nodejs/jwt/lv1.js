const JWT = require('jsonwebtoken');
const crypto = require('crypto');


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 4096 });

console.log(`Key`, { privateKey, publicKey });
// privateKey : send user
// publicKey : save database, hacker lay duoc thi cung khong tao duoc sign


const payload = {
  userId: 1234,
  roles: ['admin']
}

const token = JWT.sign(payload, privateKey, {
  algorithm: "RS256",
  expiresIn: '2 days'
});

console.log(`sign token>>>`, token);


JWT.verify(token, publicKey, (error, decode) => {
  console.log(`decode>>>`, decode);
})

// Error:
// JWT.verify(token, privateKey, (error, decode) => {
//   console.error(`error`, error);
//   console.log(`decode>>>`, decode);
// })