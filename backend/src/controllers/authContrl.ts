import { sessionRepository } from "../repositories/sessionRepo";
import { userRepository } from "../repositories/userRepo";

export const authContrl = {
    async getUserID(header: string): Promise<string> {

        const token = header.split(' ')[1];
        
        const mail = sessionRepository.getEmail(token);
        
        const user = await userRepository.findByEmail(mail);
        if (!user) {
            throw new Error('User not found');
        }
        return user._id.toString();
    },
}