import type { Middleware } from 'koa';
import { sessionRepository } from '../repositories/sessionRepo';

export const authMiddleware: Middleware = async (ctx, next) => {

  const authHeader = ctx.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized' };
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!sessionRepository.validateSession(token)) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid session' };
    return;
  }
  await next();
};
