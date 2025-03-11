import Router from 'koa-router';
import { authMiddleware } from '../middlewares/authMiddleware';
import { login, logout } from '../controllers/loginCntrl';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
  router.get('/login')
});



router.post('/login', login);
router.get('/profile', authMiddleware);
router.get('/endpoints', authMiddleware);

router.get('/logout', authMiddleware, logout);





export default router;