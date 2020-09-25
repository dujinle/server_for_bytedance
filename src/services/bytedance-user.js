const { ByteDanceUser } = require('../models')

module.exports = {
  /**
   * 用户注册
   * @param {*} info 
   */
  async create (info) {
    if(info.openid == '' || info.openid == null){
	info.openid = 'none';
    }
    const user = new ByteDanceUser(info)
    return user.save()
  },

  /**
   * 用户更新
   * @param {*} info 
   */
  async update (key,openid, info) {
    const user = await ByteDanceUser.findOneAndUpdate({ key: openid }, info)
    return user
  },

  /**
   * 根据openid获取用户
   * @param {*} id 
   */
   async getUserByOpenid (openid) {
     return ByteDanceUser.findUserByOpenid(openid)
   },

  /**
   * 根据anonymousid获取用户
   * @param {*} id 
   */
   async getUserByAnonymousId (openid) {
     return ByteDanceUser.findUserByAnonymousId(openid)
   },

   /**
    * 根据id获取用户
    * @param {*} id 
    */
   async getUserById(id) {
     return ByteDanceUser.findById(id)
   }
}
