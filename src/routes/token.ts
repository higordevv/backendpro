import { Router } from "express";
import Login from "../controllers/LoginController";

const router = Router();

export default router.post("/", Login);
