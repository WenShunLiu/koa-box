const user = require('./user');
const webHooks = require('./webhooks');
const Router = require('koa-router');
const router = new Router();
const BASE_URL = '/v1';

router.use(`${BASE_URL}/user`, user.routes());
router.use(`${BASE_URL}/github/webhook`, webHooks.routes());

module.exports = router;