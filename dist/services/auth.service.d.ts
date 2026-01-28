export declare class AuthService {
    private activityLogService;
    private otpRepository;
    private mailService;
    constructor();
    registerUser(data: any): Promise<{
        id: string;
        email: string;
        full_name: string;
    }>;
    verifyRegistration(userId: string, code: string): Promise<{
        message: string;
    }>;
    loginUser(data: any): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import("../generated").$Enums.UserRole;
        };
    }>;
    resendOtp(email: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(data: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map