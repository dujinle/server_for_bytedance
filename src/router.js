const Router = require('koa-router')
const config = require('config')

const bytedanceApi = require('./libs/bytedanceApi')
const bytedanceAuth = require('./libs/bytedanceAuth')
const WechatMessage = require('./libs/wechatMessage')
const genetrateSignature = require('./utils/getSign')
const auth = require('./middlewares/auth')

const Auth = new bytedanceAuth().instance
const Api = new bytedanceApi().instance

const ByteDanceController = require('./controllers/bytedance')


const router = new Router()

console.log(ByteDanceController);
router.get('/',async (ctx, next) => {
	ctx.body = 'koa2 string'
	next();
})

// 授权登录
router.get('/auth', ByteDanceController.login)

// 验证权限问题
//router.use(auth())

router.get('/get_game', ByteDanceController.getGame)
router.get('/get_menkes', ByteDanceController.getMenKes)
router.get('/get_zhuanpan', ByteDanceController.getZhuanPan)

router.post('/update_game', ByteDanceController.updateGame)
router.post('/update_menkes', ByteDanceController.updateMenKes)
router.post('/update_zhuanpan', ByteDanceController.updateZhuanPan)

module.exports = router
