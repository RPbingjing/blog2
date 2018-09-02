const Router = require('koa-router');
const router = new Router();
const api = require('../api');

const formatDate = require('../middleware/formatDate'); //时间格式化函数
const checkToken = require('../middleware/checkToken'); //权限验证

router
// 创建项目 
.post('/create', async(ctx,next)=>{ 
  let project = ctx.request.body;
  project.createTime = formatDate();
  console.log(project); 
  await checkToken(ctx,next);
  await api.createProj(project)
      .then(()=>{
          ctx.body = {
            code:200,
            message:'创建成功'
          };
      }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'创建失败'
          };
      });
})
// 获取项目列表(需要验证权限) checkToken,
.post('/lists', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.getProjsList()
      .then((projsLists)=>{
        ctx.body = {
          code:200,
          projsLists
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 获取项目列表(前台使用没有权限)
.get('/noAuthLists', async(ctx)=>{ 
  await api.getProjsListNoAuth()
      .then((projsLists)=>{
        ctx.body = {
          code:200,
          projsLists
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 删除一个项目 checkToken,
.post('/remove', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.removeProj(ctx.request.body.projId)
      .then((res)=>{
          ctx.body = {
            code:200,
            message:'删除成功'
          };
        }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'删除失败'
          };
      });
})
// 编辑项目 checkToken,
.post('/edit', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.updateProj(ctx.request.body)
  .then(()=>{
      ctx.body = {
        code:200,
        message:'编辑成功'
      };
  }).catch(err=>{
    ctx.body = {
      code:-200,
      message:'编辑失败'
    };
  });
});

module.exports = router
