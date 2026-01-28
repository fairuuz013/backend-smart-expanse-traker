import { PrismaClient, Budget } from '../generated';
export declare class BudgetRepository {
    private prisma;
    constructor(prismaClient: PrismaClient);
    upsertBudget(userId: string, amount: number, date: Date): Promise<Budget>;
    findByMonth(userId: string, date: Date): Promise<Budget | null>;
}
//# sourceMappingURL=budget.repository.d.ts.map