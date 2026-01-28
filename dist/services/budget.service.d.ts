export declare class BudgetService {
    private budgetRepo;
    constructor();
    setMonthBudget(userId: string, amount: number): Promise<{
        id: string;
        user_id: string;
        monthly_limit: import("@prisma/client-runtime-utils").Decimal;
        month_year: Date;
    }>;
    getCurrentBudget(useId: string): Promise<{
        limit: number;
        month: number;
        year: number;
    }>;
}
//# sourceMappingURL=budget.service.d.ts.map