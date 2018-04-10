const Router = require('koa-router');
const userInfo = require('../../controller/v1/userInfoController');
const router = new Router();

router.get('/:id', userInfo.getUserById);

router.post('/register', userInfo.register);
router.post('/login', userInfo.login);

module.exports = router;