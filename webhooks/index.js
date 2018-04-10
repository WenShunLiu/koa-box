const { spawn } = require('child_process');

const webhook = async ctx => {
  ctx.status = 200;
  ctx.body = {
    ctx
  }
};

module.exports = webhook;