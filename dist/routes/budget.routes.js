import { Router } from "express";
import { BudgetController } from "../controllers/budget.controller.js";
// FIX ERROR: Sesuaikan nama import dengan nama export di file middlewaremu
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
const budgetController = new BudgetController();
const authMiddleware = new AuthMiddleware();
router.get("/", authMiddleware.handle, budgetController.getBudget);
router.post("/", authMiddleware.handle, budgetController.setBudget);
export default router;
//# sourceMappingURL=budget.routes.js.map
