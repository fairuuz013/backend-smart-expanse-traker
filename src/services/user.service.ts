import prisma from '../database'

export class UserService {
    async updateProfile(userId: string, data: { fullName?: string}) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if(!user) throw new Error("User tidak di temukan");

        return await prisma.user.update({
            where: { id: userId },
            data: {
               ...(data.fullName && { full_name: data.fullName })
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                role: true
            }
        });
    }
}