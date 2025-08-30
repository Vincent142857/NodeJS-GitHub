export { };

const { handle } = require("express/lib/application");

const safePromise = async (callback) => {
  try {
    const res = await callback();
    return [null, res];
  } catch (error) {
    return [error, null];
  }
}

const [error, res] = await safePromise(() => fetch("https://api.example.com"));

let a;
a ??= 1;

if (error) handle(error);

console.log(res);