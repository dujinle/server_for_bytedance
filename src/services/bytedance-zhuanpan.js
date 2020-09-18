const { ZhuanPan } = require('../models')
const Filter = require('../utils/filter')
module.exports = {
  /**
   * 用户注册
   * @param {*} info 
   */
  async create (info) {
    const user = new ZhuanPan(info)
    return user.save()
  },

  /**
   * 用户更新
   * @param {*} info 
   */
  async update (query, info) {
	let updata = Filter.filter(info);
    const user = await ZhuanPan.findOneAndUpdate(query, {$set:updata},{upsert: true})
    return user
  },

  /**
   * 根据openid获取用户
   * @param {*} id 
   */
   async getByOpenid (openid) {
	return ZhuanPan.findByOpenid(openid)
   },

  /**
   * 根据anonymousid获取用户
   * @param {*} id 
   */
   async getByAnonymousId (openid) {
     return ZhuanPan.findByAnonymousId(openid)
   },

   /**
    * 根据id获取用户
    * @param {*} id 
    */
   async getUserById(id) {
     return ZhuanPan.findById(id)
   }
}
