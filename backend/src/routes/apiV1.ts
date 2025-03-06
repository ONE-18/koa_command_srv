import Router from 'koa-router';
import Database from '../utils/database';

const routerAPI = new Router({ prefix: '/api/v1' });

routerAPI.get('/info', async (ctx: any) => {
    ctx.body = {
        message: 'API v1',
        status: 'OK'
    };
});

// routerAPI.post('/users/:email', async (ctx: any) => {
//     const script = await Database.createScript(ctx.request.body);
//     ctx.body = script;
// });

routerAPI.get('/scripts/:id', async (ctx: any) => {
    const script = await Database.getScriptById(ctx.params.id);
    ctx.body = script;
});

routerAPI.get('/scripts', async (ctx: any) => {
    const scripts = await Database.getScripts();
    ctx.body = scripts;
});


export default routerAPI;