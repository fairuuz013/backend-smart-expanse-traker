import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
export class AuthController {
    authService;
    constructor() {
        this.authService = new AuthService();
    }
    register = asyncHandler(async (req, res) => {
        // --- LOG START ---
        if (process.env.NODE_ENV === "development") {
            // SAFETY: Kita pisahkan password dari body agar tidak ter-log
            const { password, ...safeBody } = req.body;
            console.log("[auth] register called from", req.ip || req.hostname, "body:", safeBody);
        }
        const newUser = await this.authService.registerUser(req.body);
        // --- LOG END ---
        if (process.env.NODE_ENV === "development") {
            try {
                console.log(`[auth] registered id=${newUser.id} email=${newUser.email}`);
            }
            catch (_) { }
        }
        res.status(201).json({
            success: true,
            message: "Operation success",
            data: newUser
        });
    });
    login = asyncHandler(async (req, res) => {
        // --- LOG START ---
        if (process.env.NODE_ENV === "development") {
            // SAFETY: Untuk login, cukup log email yang mencoba masuk. Jangan log password!
            console.log("[auth] login called from", req.ip || req.hostname, "email:", req.body.email);
        }
        const loginResult = await this.authService.loginUser(req.body);
        // --- LOG END ---
        if (process.env.NODE_ENV === "development") {
            try {
                // Asumsi loginResult punya properti user atau token
                const userId = loginResult.user?.id || "unknown";
                console.log(`[auth] login success for userId=${userId}`);
            }
            catch (_) { }
        }
        res.status(200).json({
            success: true,
            message: "Operation success",
            data: loginResult
        });
    });
    me = asyncHandler(async (req, res) => {
        // --- LOG START ---
        // Syntax A protection logic
        const user = req.user;
        if (!user)
            throw new Error("Unauthorized");
        if (process.env.NODE_ENV === "development") {
            console.log("[auth] me called from", req.ip || req.hostname, "userId:", user.id);
        }
        // Tidak ada service call khusus karena data sudah ada di req.user (dari middleware)
        // --- LOG END ---
        if (process.env.NODE_ENV === "development") {
            console.log(`[auth] me returned for userId=${user.id}`);
        }
        res.status(200).json({
            success: true,
            message: "Operation success",
            data: user
        });
    });
    verifyOtp = asyncHandler(async (req, res) => {
        const { userId, code } = req.body;
        if (process.env.NODE_ENV === "development") {
            console.log(`[auth] verifyOtp called for userId=${userId} with code=${code}`);
        }
        if (!userId || !code) {
            throw new Error("User ID dan kode OTP wajib diisi");
        }
        // Memanggil logic verifikasi yang sudah kita buat di AuthService
        const result = await this.authService.verifyRegistration(userId, code);
        if (process.env.NODE_ENV === "development") {
            console.log(`[auth] verifyOtp success for userId=${userId}`);
        }
        res.status(200).json({
            success: true,
            message: "Akun berhasil diverifikasi",
            data: result
        });
    });
    resendOtp = asyncHandler(async (req, res) => {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email wajib diisi");
        }
        const result = await this.authService.resendOtp(email);
        res.status(200).json({
            success: true,
            message: "Operation success",
            data: result
        });
    });
    forgotPassword = asyncHandler(async (req, res) => {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email wajib diisi");
        }
        const result = await this.authService.requestPasswordReset(email);
        // Menggunakan format standar response aplikasi
        res.status(200).json({
            success: true,
            message: "Permintaan reset password berhasil diproses",
            data: result
        });
    });
    // 2. Endpoint untuk Eksekusi Reset Password (Input OTP + Pass Baru) - Updated
    resetPassword = asyncHandler(async (req, res) => {
        // Langsung lempar body ke service
        const result = await this.authService.resetPassword(req.body);
        // Menggunakan format standar response aplikasi
        res.status(200).json({
            success: true,
            message: "Password berhasil diubah",
            data: result
        });
    });
}
//# sourceMappingURL=auth.controller.js.map
