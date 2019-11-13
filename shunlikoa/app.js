
const koa = require('koa');

const app = new koa();

const koaStatic = require('koa-static');

const path = require('path');

const router = require('./router');

const bodyparser = require('koa-bodyparser');

//1.处理静态资源

// app.use(koaStatic(path.join(process.cwd(),'public')));

//3.处理post传递的参数放到ctx.request.body

app.use(bodyparser());

//2.处理路由
app.use(router.routes());

app.use(router.allowedMethods());

app.listen(3000,() => {
    console.log("服务启动成功")
})