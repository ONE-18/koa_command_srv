import Router from '@koa/router';

const router = new Router();

// Ruta raíz "/"
router.get('/', (ctx) => {
  ctx.body = { message: 'Bienvenido a la página principal' };
});

// Ruta "/admin"
router.get('/admin', (ctx) => {
  ctx.body = { message: 'Panel de administración' };
});

// Captura cualquier otra ruta
router.all('(.*)', (ctx) => {
  ctx.body = { error: `Ruta ${ctx.request.path} no encontrada` };
  ctx.status = 404;
});

export default router;
