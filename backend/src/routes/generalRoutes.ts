import Router from 'koa-router';
import { authMiddleware } from '../middlewares/authMiddleware';
import { login } from '../controllers/loginCntrl';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
  router.get('/login')
});



router.get('/login', login);
router.get('/profile', authMiddleware);
router.get('/endpoints', authMiddleware);


// router.get('/logout', authMiddleware, logut);




export default router;