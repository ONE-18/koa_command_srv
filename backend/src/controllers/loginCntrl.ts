import type { Context } from 'koa';
// import crypto from 'crypto';
import { sessionRepository } from '../repositories/sessionRepo';
import userPasswCheck from '../services/userPasswCheck';

// const SECRET_KEY = crypto.randomBytes(64).toString('hex');

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (ctx: Context) => {
    const { email, password } = ctx.request.body as LoginRequestBody;

    if (await userPasswCheck.checkPassw(email, password)) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid credentials' };
        return;
    }
    // const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    const token = 'token_seguro';
    sessionRepository.createSession(token, email);
    ctx.body = { token };
};
