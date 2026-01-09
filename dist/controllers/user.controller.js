import { UserService } from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export class UserController {
    userService = new UserService();
    constructor() {
        this.userService = new UserService();
    }
    updateProfile = asyncHandler(async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Unauthorized: User ID not found");
        }
        const { fullName } = req.body;
        const updateUser = await this.userService.updateProfile(userId, { fullName });
        res.status(200).json({
            success: true,
            massage: "Oprasion success",
            data: updateUser
        });
    });
}
//# sourceMappingURL=user.controller.js.map
