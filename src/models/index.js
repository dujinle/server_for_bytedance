const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise

mongoose.connect(config.get('db.url'), {
  useMongoClient: true
  authSource:config.get('db.authSource'),
  server:{
     auto_reconnect:true,
     poolSize:3
  },
  user: config.get('db.user'),
  pass: config.get('db.password')
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
