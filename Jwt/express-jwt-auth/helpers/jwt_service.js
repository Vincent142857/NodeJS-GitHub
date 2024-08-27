const JWT = require('jsonwebtoken');
require('dotenv').config();
const createHttpError = require('http-errors');
const client = require('../helpers/connection_redis');

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '60s'
    }

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(createHttpError.Unauthorized());
  }

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name == "JsonWebTokenError") {
        return next(createHttpError.Unauthorized());
      }
      return next(createHttpError.Unauthorized(err.message));
    }
    req.payload = payload;
    next();
  })
}

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y'
    }

    JWT.sign(payload, secret, options,async (err, token) => {
      if (err) reject(err);
      console.log(`Save refreshToken`);
      await client.set(userId.toString(), token, { "EX": 365 * 24 * 60 * 60}, (err, reply) => {
        if (err) return reject(createHttpError.InternalServerError());
        console.log(`save success, reply>>>${reply}`);
      })
      resolve(token);
    })
  })
}

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err);
      client.get(payload.userId, (err, reply) => {
        if (err) {
          return reject(createHttpError.InternalServerError());
        }
        if (refreshToken === reply) {
          resolve(payload);
        }
        return reject(createHttpError.Unauthorized());
      })
    });
  })
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken
}