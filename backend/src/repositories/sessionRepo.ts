
class SessionRepository {
    private sessions: Map<string, string> = new Map();

    createSession(token: string, email: string) {
        this.sessions.set(token, email);
    }

    validateSession(token: string): boolean {
        return this.sessions.has(token);
    }

    deleteSession(token: string) {
        this.sessions.delete(token);
    }
}

export const sessionRepository = new SessionRepository();