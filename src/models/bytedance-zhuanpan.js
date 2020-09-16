const mongoose = require('mongoose')
const Schema = mongoose.Schema

const zpSchema = new Schema({
  openid: { type: String, unique: true },
  anonymous_openid: {type: String, unique: true },
  lastTime: Number,
  adTime:{type: Number,default:10},
  adUseDay:{type:Number,default:0}
})

zpSchema.static('findByOpenid', function (openid) {
  return this.findOne({ openid: openid })
})

zpSchema.static('findByAnonymousId', function (openid) {
  return this.findOne({ anonymous_openid: openid })
})

module.exports = mongoose.model('ZhuanPan', zpSchema)
