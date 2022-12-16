import { Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/findAll", UserController.findAllUsers);
router.get("/:id", UserController.findUser);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

export default router;
