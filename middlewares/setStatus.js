module.exports = async (ctx, next) => {
  console.log(ctx);
  console.log(ctx.status);
  ctx.status = 200;
  await next();
}