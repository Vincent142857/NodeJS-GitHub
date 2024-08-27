const createHttpError = require('http-errors');
const User = require('../models/user.model');
const { userValidate } = require('../helpers/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_service');
const client = require('../helpers/connection_redis');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidate(req.body);
      if (error) throw createHttpError(400, error.details[0].message);

      if (!email || !password) {
        throw createHttpError.BadRequest();
      }

      const isExist = await User.findOne({
        username: email
      });

      if (isExist) {
        throw createHttpError.Conflict(`${email} had ready been.`)
      }

      const newUser = new User({
        username: email,
        password
      });

      const savedUser = await newUser.save(); //should use save, to use middleware

      return res.json({
        status: 'success',
        elements: savedUser
      });

    } catch (error) {
      next(error); //it be read by error handler
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createHttpError.BadRequest();

      const { userId } = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const refreshTokenNew = await signRefreshToken(userId);

      res.json({
        accessToken,
        refreshToken: refreshTokenNew
      });

    } catch (error) {
      next(error);
    }
    res.send("refresh-token")
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidate(req.body);
      if (error) throw createHttpError(400, error.details[0].message);

      const user = await User.findOne({ username: email });
      if (!user) {
        throw createHttpError.NotFound("User not registered")
      }

      const isValid = await user.isCheckPassword(password);
      if (!isValid) {
        throw createHttpError.Unauthorized("Password isValid");
      }
      const accessToken = await signAccessToken(user._id);
      console.log(`Create token>>${accessToken}`);
      console.log(`Create refreshToken`);
      const refreshToken = await signRefreshToken(user._id);
      console.log(`Finish token>>>${refreshToken}`);
      res.json({
        accessToken,
        refreshToken
      });

    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createHttpError.BadRequest();

      const { userId } = await verifyRefreshToken(refreshToken);
      client.del(userId.toString(), (err, reply) => {
        if (err) throw createHttpError.InternalServerError();
        res.json({
          message: 'logout'
        })
      })

    } catch (error) {
      next(error);
    }
    res.send("logout")
  },
  getList: (req, res, next) => {
    console.log(`header>>>`, req.headers);
    const listUsers = [
      {
        username: 'abc@gmail.com'
      },
      {
        username: 'def@gmail.com'
      }
    ]
    res.json({
      listUsers
    })
  }
}