import JwtMiddleware from "../middlewares/JwtMiddleware";
import { Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/me", JwtMiddleware, UserController.findUser);
router.put("/update/", JwtMiddleware, UserController.updateUser);
router.delete("/delete", JwtMiddleware, UserController.deleteUser);

export default router;
