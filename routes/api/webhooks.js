const Router = require('koa-router');
const webhookService = require('../../webhooks/index.js');

const router = new Router();
router.post('/', webhookService);

module.exports = router;