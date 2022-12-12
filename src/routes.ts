import { Router } from "express";

import CreateUserController from "./controllers/UserControllers/CreateUserController";
import FindAllUsersController from "./controllers/UserControllers/FindAllUsersController";
import DeleteUsersController from "./controllers/UserControllers/DeleteUsersController";
import UpdateUserController from "./controllers/UserControllers/UpdateUserController";
import FindUserController from "./controllers/UserControllers/FindUserController";

const router = Router();

// USER CRUD MEU NOBRE
// Create
router.post("/register", CreateUserController);
// Read
router.get("/users", FindAllUsersController);
router.get("/user/:id", FindUserController);
// Update
router.put("/users/update/:id", UpdateUserController);
// Delete
router.delete("/users/delete/:id", DeleteUsersController);
export default router;
