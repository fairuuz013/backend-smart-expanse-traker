export declare class DashboardService {
    private transactionRepo;
    private walletRepo;
    constructor();
    getDashboardData(userId: string, month?: number, year?: number): Promise<{
        summary: {
            total_balance: number;
            income: number;
            expense: number;
        };
        chart: {
            income: number;
            expense: number;
            date: string;
        }[];
        recent_transactions: ({
            wallet: {
                id: string;
                name: string;
            };
            category: {
                id: number;
                name: import("../generated").$Enums.CategoryOption;
                type: import("../generated").$Enums.TransactionType;
            };
            attachments: {
                created_at: Date;
                id: string;
                transaction_id: string;
                file_path: string;
                file_type: string;
            }[];
        } & {
            created_at: Date;
            id: string;
            user_id: string;
            name: string;
            type: import("../generated").$Enums.TransactionType;
            deleted_at: Date | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            note: string | null;
            transaction_date: Date;
            updated_at: Date;
            category_id: number;
            wallet_id: string;
        })[];
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map