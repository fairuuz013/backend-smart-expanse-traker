export class BudgetRepository {
    prisma;
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async upsertBudget(userId, amount, date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const existingBudget = await this.prisma.budget.findFirst({
            where: { user_id: userId, month_year: startOfMonth }
        });
        if (existingBudget) {
            return this.prisma.budget.update({
                where: { id: existingBudget.id },
                data: { monthly_limit: amount }
            });
        }
        else {
            return this.prisma.budget.create({
                data: {
                    user_id: userId,
                    monthly_limit: amount,
                    month_year: startOfMonth
                }
            });
        }
    }
    async findByMonth(userId, date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return this.prisma.budget.findFirst({
            where: { user_id: userId, month_year: startOfMonth }
        });
    }
}
//# sourceMappingURL=budget.repository.js.map