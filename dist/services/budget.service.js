import { BudgetRepository } from "../repositories/budget.repository.js";
import prisma from "../database.js";
export class BudgetService {
    budgetRepo;
    constructor() {
        this.budgetRepo = new BudgetRepository(prisma);
    }
    async setMonthBudget(userId, amount) {
        if (amount < 0)
            throw new Error("Budget tidak boleh negatif");
        const today = new Date();
        return await this.budgetRepo.upsertBudget(userId, amount, today);
    }
    async getCurrentBudget(useId) {
        const today = new Date();
        const budget = await this.budgetRepo.findByMonth(useId, today);
        return {
            limit: budget ? Number(budget.monthly_limit) : 0,
            month: today.getMonth() + 1,
            year: today.getFullYear()
        };
    }
}
//# sourceMappingURL=budget.service.js.map
