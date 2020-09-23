const { ByteDanceGame } = require('../models')
const Filter = require('../utils/filter')
module.exports = {
  /**
   * 用户注册
   * @param {*} info 
   */
  async create (info) {
    const user = new ByteDanceGame(info)
    return user.save()
  },

  /**
   * 用户更新
   * @param {*} info 
   */
  async update (query, info) {
	let updata = Filter.filter(info);
	if(updata.curGame && updata.curGame != ''){
		updata.curGame = JSON.stringify(updata.curGame);
	}
	if(updata.lastInfo && updata.lastInfo != ''){
		updata.lastInfo = JSON.stringify(updata.lastInfo);
	}
    const user = await ByteDanceGame.findOneAndUpdate(query, {$set:updata},{upsert: true})
    return user
  },

  /**
   * 根据openid获取用户
   * @param {*} id 
   */
   async getUserByOpenid (openid) {
     return ByteDanceGame.findUserByOpenid(openid)
   },

  /**
   * 根据anonymousid获取用户
   * @param {*} id 
   */
   async getUserByAnonymousId (openid) {
     return ByteDanceGame.findUserByAnonymousId(openid)
   },

   /**
    * 根据id获取用户
    * @param {*} id 
    */
   async getUserById(id) {
     return ByteDanceGame.findById(id)
   }
}
