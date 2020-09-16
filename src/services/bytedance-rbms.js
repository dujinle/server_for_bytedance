const { ByteDanceRBM } = require('../models')
const Filter = require('../utils/filter')

module.exports = {
  /**
   * 用户注册
   * @param {*} info 
   */
  async create (info) {
    const user = new ByteDanceRBM(info)
    return user.save()
  },

  /**
   * 用户更新
   * @param {*} info 
   */
  async update (query, info) {
	let updata = Filter.filter(info);
    const user = await ByteDanceRBM.findOneAndUpdate(query, {$set:updata},{upsert: true})
    return user
  },

  /**
   * 根据openid获取用户
   * @param {*} id 
   */
   async getUserByOpenid (openid) {
     return ByteDanceRBM.findUserByOpenid(openid)
   },

  /**
   * 根据anonymousid获取用户
   * @param {*} id 
   */
   async getUserByAnonymousId (openid) {
     return ByteDanceRBM.findUserByAnonymousId(openid)
   },

   /**
    * 根据id获取用户
    * @param {*} id 
    */
   async getUserById(id) {
     return ByteDanceRBM.findById(id)
   }
}
