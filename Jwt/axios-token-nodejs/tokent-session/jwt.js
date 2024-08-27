const JWT = require('jsonwebtoken');

JWT.sign({ userId: 123456 }, "hssssss", { algorithm: 'HS256' }, (err, token) => {
  try {
    console.log(`token>>>`, token);
  } catch (error) {
    console.error(err)
    console.error(error)
  }
});

//node: khong de thong tin dang nhap vao payload, vif owr day laf ma hoa base64, co the decode (xem thong tin)

const tokenDecode = Buffer.from('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1NiwiaWF0IjoxNzAzMjA4NTY3fQ.Sa0FnhLegef2Wum_U65uwOMSAEROQ-zc7IoCAJAw-wg', 'base64').toString();

console.log(`decode>>>`, tokenDecode);