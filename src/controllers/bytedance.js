const User = require('../services/bytedance-user')
const Game = require('../services/bytedance-game')
const ZhuanPan = require('../services/bytedance-zhuanpan')
const RBMS = require('../services/bytedance-rbms')
const ByteDanceAuth = require('../libs/bytedanceAuth')
const Filter = require('../utils/filter')
const Auth = new ByteDanceAuth().instance

module.exports = {
  /**
   * 用户登录 and 注册 由于这里是oauth 且不提供自身的用户系血色,就这么将就吧
   * @param {*} ctx 
   * @param {*} next 
   */
  async login (ctx, next) {
    const code = ctx.query.code
	const anonymous_code = ctx.query.anonymousCode
	ctx.log.info('login',code,anonymous_code);
    //const data = await Auth.getAccessToken(code)
	/*
	 * 匿名和非匿名都支持
	 */
    const userinfo = await Auth.getUserinfo(code,anonymous_code)
    ctx.session.user = userinfo
	ctx.log.info('auth userinfo',userinfo);
	let user = null
	if(userinfo.openid && userinfo.openid != 'none' && userinfo.openid != ''){
		user = await User.getUserByOpenid(userinfo.openid);
	}
	if(user){
		ctx.body = user
	}else{
		if(userinfo.anonymous_openid && userinfo.anonymous_openid != 'none' && userinfo.anonymous_openid != ''){
			user = await User.getUserByAnonymousId(userinfo.anonymous_openid)
		}
		if(user){
			ctx.body = user
		}else{
			user = await User.create(userinfo);
			ctx.body = user
		}
	}
  },
  async getGame(ctx,next){
	const openid = ctx.query.openid;
	const anonymous_openid = ctx.query.anonymous_openid;
	ctx.log.info('getGame',openid,anonymous_openid);
	let game = null
	if(openid && openid != 'none'){
		game = await Game.getUserByOpenid(openid);
	}
	if(game){
		ctx.body = game;
	}else{
		if(anonymous_openid && anonymous_openid != 'none'){
			game = await Game.getUserByAnonymousId(anonymous_openid);
		}
		if(game){
			ctx.body = game;
		}else{
			game = await Game.create({openid:openid,anonymous_openid:anonymous_openid});
			ctx.body = game
		}
	}
  },
  async updateGame(ctx,next){
	const body = JSON.parse(ctx.request.body);
	const openid = body.openid;
	const anonymous_openid = body.anonymous_openid;
	const data = body.data;
	ctx.log.info('updateGame',body);
	let game = null;
	if(openid && openid != 'none'){
		game = await Game.update({'openid':openid},data);
	}
	if(game){
		ctx.body = game;
	}else{
		if(anonymous_openid && anonymous_openid != 'none'){
			game = await Game.update({'anonymous_openid':anonymous_openid},data);
		}
		if(game){
			ctx.body = game;
		}
	}
  },
  async getMenKes(ctx,next){
	const openid = ctx.query.openid;
	const anonymous_openid = ctx.query.anonymous_openid;
	ctx.log.info('getMenKes',openid,anonymous_openid)
	let rbms = null
	if(openid && openid != 'none'){
		rbms = await RBMS.getUserByOpenid(openid);
	}
	if(rbms){
		ctx.body = rbms
	}else{
		if(anonymous_openid && anonymous_openid != 'none'){
			rbms = await RBMS.getUserByAnonymousId(anonymous_openid);
		}
		if(rbms){
			ctx.body = rbms
		}else{
			rbms = await RBMS.create({openid:openid,anonymous_openid:anonymous_openid});
			ctx.body = rbms
		}
	}
  },
  async updateMenKes(ctx,next){
	const body = JSON.parse(ctx.request.body);
	const openid = body.openid;
	const anonymous_openid = body.anonymous_openid;
	const data = body.data;
	ctx.log.info('updateMenKes',body,data)
	let rbms = null;
	if(openid && openid != 'none'){
		rbms = await RBMS.update({'openid':openid},data);
	}
	if(rbms){
		ctx.body = game;
	}else{
		if(anonymous_openid && anonymous_openid != 'none'){
			rbms = await RBMS.update({'anonymous_openid':anonymous_openid},data);
		}
		if(rbms){
			ctx.body = game;
		}
	}
  },
  async getZhuanPan(ctx,next){
	const openid = ctx.query.openid;
	const anonymous_openid = ctx.query.anonymous_openid;
	let zhuanpan = null
	if(openid && openid != 'none'){
		zhuanpan = await ZhuanPan.getByOpenid(openid);
	}
	if(zhuanpan){
		ctx.body = zhuanpan
	}else{ 
		if(anonymous_openid && anonymous_openid != 'none'){
			zhuanpan = await ZhuanPan.getByAnonymousId(anonymous_openid);
		}
		if(zhuanpan){
			ctx.body = zhuanpan
		}else{
			zhuanpan = await ZhuanPan.create({openid:openid,anonymous_openid:anonymous_openid});
			ctx.body = zhuanpan
		}
	}
  },
  async updateZhuanPan(ctx,next){
	const body = JSON.parse(ctx.request.body);
	const openid = body.openid;
	const anonymous_openid = body.anonymous_openid;
	const data = body.data;
	ctx.log.info('updateZhuanPan',body,data)
	let zhuanpan = null;
	if(openid && openid != 'none'){
		zhuanpan = await ZhuanPan.update({'openid':openid},data);
		ctx.log.info('updated',zhuanpan);
	}
	if(zhuanpan){
		ctx.body = zhuanpan;
	}else{
		if(anonymous_openid && anonymous_openid != 'none'){
			zhuanpan = await ZhuanPan.update({'anonymous_openid':anonymous_openid},data);
		}
		if(zhuanpan){
			ctx.body = zhuanpan;
		}
	}
  }
}
