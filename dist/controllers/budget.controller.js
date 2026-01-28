import { BudgetService } from "../services/budget.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export class BudgetController {
    budgetService;
    constructor() {
        this.budgetService = new BudgetService();
    }
    // Set Budget (Upsert)
    setBudget = asyncHandler(async (req, res) => {
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Unauthorized");
        const { amount } = req.body;
        // Validasi input sederhana
        if (!amount || isNaN(Number(amount))) {
            throw new Error("Amount harus berupa angka valid");
        }
        const result = await this.budgetService.setMonthBudget(userId, Number(amount));
        res.status(200).json({
            success: true,
            message: "Budget berhasil diset",
            data: result
        });
    });
    // Get Current Budget
    getBudget = asyncHandler(async (req, res) => {
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Unauthorized");
        const data = await this.budgetService.getCurrentBudget(userId);
        res.status(200).json({
            success: true,
            message: "Operation success",
            data: data
        });
    });
}
//# sourceMappingURL=budget.controller.js.map
