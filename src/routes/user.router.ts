import { Router } from "express";
import { UserController } from "../controllers";

const UserRouter = Router();

UserRouter.post("/users", UserController.createUsers);
UserRouter.get("/users", UserController.getUsers);
UserRouter.put("/users/:userId", UserController.updateUsers);
UserRouter.delete("/users/:userId", UserController.deleteUsers);
UserRouter.patch("/users/:id/hobbies", UserController.updateHobbies);


export default UserRouter;
