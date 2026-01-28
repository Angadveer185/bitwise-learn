import { Router } from "express";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/admin/login", authController.adminLogin);
router.post("/institution/login", authController.institutionLogin);
router.post("/vendor/login", authController.vendorLogin);
router.post("/teacher/login", authController.teacherLogin);
router.post("/student/login", authController.studentLogin);
router.post("/refresh", authController.refreshToken);
// router.post("/send-verification-otp", authController.sendVerificationOTP.bind(authController));
// router.post("/verify-account", authController.matchVerificationOTP.bind(authController));
// router.post("/reset-password", authController.resetPassword.bind(authController));
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-forgot-password", authController.verifyForgotPassword);
router.post("/reset-password", authController.resetPassword);


export default router;
