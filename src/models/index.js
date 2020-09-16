const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise

mongoose.connect(config.get('db.url'), {
  useMongoClient: true
})

const User = require('./user')
const ByteDanceUser = require('./bytedance-user')
const ZhuanPan = require('./bytedance-zhuanpan')
const ByteDanceRBM = require('./bytedance-rbms')
const ByteDanceGame = require('./bytedance-game')

module.exports = {
  User,
  ByteDanceUser,
  ZhuanPan,
  ByteDanceRBM,
  ByteDanceGame
}
