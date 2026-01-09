import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
export class AuthController {
    authService;
    constructor() {
        this.authService = new AuthService();
    }
    // Gunakan arrow function agar tidak perlu bind(this) di router
    register = asyncHandler(async (req, res) => {
        const newUser = await this.authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "Operation success",
            data: newUser
        });
    });
    login = asyncHandler(async (req, res) => {
        const loginData = await this.authService.loginUser(req.body);
        // Response Format Standard
        res.status(200).json({
            success: true,
            message: "Operation success",
            data: loginData
        });
    });
}
//# sourceMappingURL=auth.controller.js.map
