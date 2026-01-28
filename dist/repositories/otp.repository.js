export class OtpRepository {
    prisma;
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async createOtp(userId, code, type) {
        return await this.prisma.otp.create({
            data: {
                user_id: userId,
                code: code,
                type: type,
                expired_at: new Date(Date.now() + 5 * 60 * 1000) // 5 Menit
            }
        });
    }
    async findValidOtp(userId, code) {
        return await this.prisma.otp.findFirst({
            where: {
                user_id: userId,
                code: code,
                expired_at: { gt: new Date() }
            }
        });
    }
    async deleteUserOtps(userId) {
        return await this.prisma.otp.deleteMany({
            where: { user_id: userId }
        });
    }
}
//# sourceMappingURL=otp.repository.js.map