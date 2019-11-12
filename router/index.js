const router = require('koa-router')();
const db=require("../db")
const query=require("../db/query.js")

router.post("/api/count",async ctx=>{
  
       const aaa= await query("select count(*) from shunli_koa")
       console.log(aaa.data[0]);
       ctx.body={
           code:0,
           msg:aaa.data[0]
       }
     
})
router.post("/api/add",async ctx=>{

    const {xu,bei,lian,time}=ctx.request.body
    const num=await query("select * from shunli_koa where lian=?",[lian])
    if(num.data.length>=1){
        ctx.body={
            code:0,
            msg:"链接已存在"
        }
    }else if(xu&&bei&&lian&&time){
        try{
            const aaa=await query("insert into shunli_koa (xu,bei,lian,time)values(?,?,?,?)",[xu,bei,lian,time])
            ctx.body={
                code:1,
                msg:"添加成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e.message
            }
        }

    }else{
        ctx.body={
            code:0,
            msg:"写全了再点"
        }
    }

})

router.post("/api/delete",async ctx=>{
    const {xu,bei,lian,time,id}=ctx.request.body
    if(id===undefined){
        ctx.body={
            code:0,
            msg:"传入id"
        }
    }else{
        const num=await query("select * from shunli_koa where id=?",[id])
        if(num.data.length>=1){
            try{
                const aaa=await query("delete from shunli_koa where id=?",[id])
                ctx.body={
                    code:1,
                    msg:"删除成功"
                }
            }catch(e){
                ctx.body={
                    code:0,
                    msg:e.message
                }
            }

        }else{
            ctx.body={
                code:1,
                msg:"蠢货，数据已删除了！你还要删几遍？"
            }
        }

    }

})
router.post("/api/update",async ctx=>{
    const {xu,bei,lian,time,id}=ctx.request.body
    try{
        const aaa=await query("update shunli_koa set xu=?,bei=?,lian=?,time=? where id=?",[xu,bei,lian,time,id])
        ctx.body={
            code:1,
            msg:"修改成功"
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:e.message
        }
    }

})

router.post("/api/select",async (ctx)=>{
    const {xu,bei,lian,time,id}=ctx.request.body
    if(id===undefined&&lian===undefined){
        try{
            const aaa=await query("select * from shunli_koa ")
            ctx.body={
                code:1,
                aaa
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e.message
            }
        }

    }else{
        if(id===undefined){
            try{
                const aaa=await query("select * from shunli_koa where lian=?",[lian])
                ctx.body={
                    code:1,
                    aaa
                }
            }catch(e){
                ctx.body={
                    code:0,
                    msg:e.message
                }
            }

        }else{
            try{
                const aaa=await query("select * from shunli_koa where id=?",[id])
                ctx.body={
                    code:1,
                    aaa
                }
            }catch(e){
                ctx.body={
                    code:0,
                    msg:e.message
                }
            }

        }

    }
})


module.exports = router