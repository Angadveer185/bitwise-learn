import { Router } from "express";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/admin/login", authController.adminLogin);
router.post("/institution/login", authController.institutionLogin);
router.post("/vendor/login", authController.vendorLogin);
router.post("/teacher/login", authController.teacherLogin);
router.post("/student/login", authController.studentLogin);
router.post("/refresh", authController.refreshToken);

export default router;
