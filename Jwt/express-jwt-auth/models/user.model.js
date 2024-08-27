const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//middleware function - don't user arrow function

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10); //do bao mat cua ma hoa, cang cao, ma cang phuc tap
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next(); //continue
  } catch (error) {
    next(error)
  }
});


UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
}

module.exports = mongoose.model("users", UserSchema);
