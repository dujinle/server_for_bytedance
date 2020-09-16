const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  openid: { type: String, unique: true },
  anonymous_openid: { type: String, unique: true },
  gameType:Number,
  gameStime:Number,
  audioSupport:Number,
  curLevel:{type:Number,default:0},
  tipNum:{type:Number,default:3},
  livesNum:{type:Number,default:5},
  curGame:String,
  livesTime:Number,
  unLock:Number,
  unLockIdx:Number
})

userSchema.static('findUserByOpenid', function (openid) {
  return this.findOne({ openid: openid })
})

userSchema.static('findUserByAnonymousId', function (openid) {
  return this.findOne({ anonymous_openid: openid })
})

module.exports = mongoose.model('ByteDanceGame', userSchema)
