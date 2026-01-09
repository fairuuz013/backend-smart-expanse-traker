export declare class UserService {
    updateProfile(userId: string, data: {
        fullName?: string;
    }): Promise<{
        id: string;
        full_name: string;
        email: string;
        role: import("../generated").$Enums.UserRole;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map