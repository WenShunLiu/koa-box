const user = require('./user');
const Router = require('koa-router');
const router = new Router();
const BASE_URL = '/v1';

router.use(`${BASE_URL}/user`, user.routes());

module.exports = router;