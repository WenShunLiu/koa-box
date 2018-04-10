const { spawn } = require('child_process');

const webhook = async ctx => {
  ctx.body = {
    ctx
  }
};

module.exports = webhook;