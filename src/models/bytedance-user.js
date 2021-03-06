const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  openid: { type: String },
  anonymous_openid: { type: String },
  avatar: String,
  sex: Number,
  nickname: String,
  city: String,
  province: String,
  country: String,
  created_at: Date,
  last_login: { type: Date, default: Date.now() }
})

userSchema.static('findUserByOpenid', function (openid) {
  return this.findOne({ openid: openid })
})

userSchema.static('findUserByAnonymousId', function (openid) {
  return this.findOne({ anonymous_openid: openid })
})

module.exports = mongoose.model('ByteDanceUser', userSchema)
