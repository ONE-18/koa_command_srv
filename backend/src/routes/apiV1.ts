import Router from 'koa-router';
import Database from '../utils/database';
import { authContrl } from '../controllers/authContrl';
import { authMiddleware } from '../middlewares/authMiddleware';
import { MEndpoint, Language } from '../models';

const routerAPI = new Router({ prefix: '/api/v1' });

routerAPI.get('/info', async (ctx: any) => {
    ctx.body = {
        message: 'API v1',
        status: 'OK'
    };
});

routerAPI.get('/scripts/:id', authMiddleware, async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    const script = await Database.getUserScriptById(userID, ctx.params.id);
    ctx.body = script;
});

routerAPI.get('/scripts', authMiddleware, async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    const scripts = await Database.getUserScripts(userID);
    ctx.body = scripts;
});

routerAPI.get('/endpoints', async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    const endpoints = await Database.getEndpoints(userID);
    ctx.body = endpoints;
});

routerAPI.get('/endpoint/:id', async (ctx: any) => {
    const endId = ctx.params.id;
    const endp = await Database.getEndpoint(endId);
    ctx.body = endp;
});

routerAPI.patch('/endpoint/:id', async (ctx: any) => {
    const endId = ctx.params.id;
    const endp = await Database.getEndpoint(endId);
    const updatedEndpoint = ctx.request.body;
    ctx.body = await Database.update(MEndpoint, { ...endp, ...updatedEndpoint });
});

routerAPI.get('/languages', async (ctx: any) => {
    ctx.body = Language;
});

export default routerAPI;