import type {  Request ,Response  } from "express";
import { UserService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";

export class UserController {
    private userService = new UserService();

    constructor() {
        this.userService = new UserService()
    }
    
    public updateProfile = asyncHandler(async (req: Request, res: Response) =>{
        const userId = req.user?.id

        if(!userId) {
            throw new Error("Unauthorized: User ID not found");    
        }

        const { fullName } = req.body

        const updateUser = await this.userService.updateProfile(userId, { fullName });


        res.status(200).json({
            success: true,
            massage: "Oprasion success",
            data: updateUser
        });
    });
}