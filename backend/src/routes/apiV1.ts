import Router from 'koa-router';
import Database from '../utils/database';
import { authContrl } from '../controllers/authContrl';
import { authMiddleware } from '../middlewares/authMiddleware';
import { MEndpoint, Language, MScript } from '../models';
// import router from './generalRoutes';

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

routerAPI.put('/scripts/:id', authMiddleware, async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    const script = await Database.getUserScriptById(userID, ctx.params.id);
    const updatedScript = ctx.request.body;
    console.log(updatedScript);
    ctx.body = await Database.update(MScript, { ...script, ...updatedScript });
});

routerAPI.delete('/scripts/:id', authMiddleware, async (ctx: any) => {
    const userID = await authContrl.getUserID(ctx.headers.authorization);
    const script = await Database.getUserScriptById(userID, ctx.params.id);
    ctx.body = await Database.delete(MScript, script);
});

routerAPI.get('/endpoints', authMiddleware, async (ctx: any) => {
    const endpoints = await Database.getEndpoints();
    ctx.body = endpoints;
});

routerAPI.get('/endpoints/:id', authMiddleware, async (ctx: any) => {
    const endId = ctx.params.id;
    const endp = await Database.getEndpoint(endId);
    ctx.body = endp;
});

routerAPI.put('/endpoints/:id', authMiddleware, async (ctx: any) => {
    // const endId = ctx.params.id;
    // const endp = await Database.getEndpoint(endId);
    // console.log(endp);
    const updatedEndpoint = ctx.request.body;
    console.log(updatedEndpoint);
    ctx.body = await Database.update(MEndpoint, updatedEndpoint );
});

routerAPI.get('/languages', authMiddleware, async (ctx: any) => {
    ctx.body = Language;
});

export default routerAPI;