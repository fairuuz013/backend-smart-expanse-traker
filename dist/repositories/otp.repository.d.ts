import { PrismaClient, Otp } from '../generated';
export declare class OtpRepository {
    private prisma;
    constructor(prismaClient: PrismaClient);
    createOtp(userId: string, code: string, type: any): Promise<Otp>;
    findValidOtp(userId: string, code: string): Promise<Otp | null>;
    deleteUserOtps(userId: string): Promise<import("../generated").Prisma.BatchPayload>;
}
//# sourceMappingURL=otp.repository.d.ts.map