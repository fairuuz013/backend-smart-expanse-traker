import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req: Request, res: Response) => {
    // Controller cuma melempar body ke service
    const newUser = await this.authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Operation success",
      data: newUser
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    // Controller terima data matang (token + user) dari service
    const loginResult = await this.authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Operation success",
      data: loginResult 
    });
  });
}