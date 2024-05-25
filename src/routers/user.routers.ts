import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { userCreateSchema, userUpdateSchema } from "../schemas";

const userRouter: Router = Router();

userRouter.post(
    "",
    middlewares.validateBody(userCreateSchema),
    middlewares.uniqueEmail,
    userControllers.create
);

userRouter.get("", middlewares.verifyToken, middlewares.isAdmin, userControllers.read);

userRouter.get(
    "/:id/courses",
    middlewares.verifyToken,
    middlewares.isAdmin,
    middlewares.validateId("params", "userId", "users", "User not found"),
    userControllers.listCoursesUser
)

export default userRouter;