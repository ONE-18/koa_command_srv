import Router from 'koa-router';
import Database from '../utils/database';
import { authContrl } from '../controllers/authContrl';
import { authMiddleware } from '../middlewares/authMiddleware';

const routerAPI = new Router({ prefix: '/api/v1' });

routerAPI.get('/info', async (ctx: any) => {
    ctx.body = {
        message: 'API v1',
        status: 'OK'
    };
});

routerAPI.get('/scripts/:id', authMiddleware, async (ctx: any) => {
    
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    
    console.log('userID', userID);

    const script = await Database.getUserScriptById(userID, ctx.params.id);
    
    ctx.body = script;
});

routerAPI.get('/scripts', authMiddleware, async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    
    console.log('userID', userID);
    
    const scripts = await Database.getUserScripts(userID);
    ctx.body = scripts;
});


export default routerAPI;