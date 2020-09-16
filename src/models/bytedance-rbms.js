const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rbmSchema = new Schema({
  openid: { type: String, unique: true },
  anonymous_openid: { type: String, unique: true },
  rolehas:{type:Number,default:1},
  roleshow:{type:Number,default:1},
  buildhas:{type:Number,default:1},
  buildshow:{type:Number,default:1},
  menkehas:{type:Number,default:0},
  menkeshow:{type:Number,default:0}
})

rbmSchema.static('findUserByOpenid', function (openid) {
  return this.findOne({ openid: openid })
})

rbmSchema.static('findUserByAnonymousId', function (openid) {
  return this.findOne({ anonymous_openid: openid })
})

module.exports = mongoose.model('ByteDanceRBM', rbmSchema)
