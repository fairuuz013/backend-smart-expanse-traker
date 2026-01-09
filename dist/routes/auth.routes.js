import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
const router = Router();
const authController = new AuthController();
// Route Public (Tidak butuh token)
router.post("/register", authController.register);
router.post("/login", authController.login);
export default router;
//# sourceMappingURL=auth.routes.js.map
