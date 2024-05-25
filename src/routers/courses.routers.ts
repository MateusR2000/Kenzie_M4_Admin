import { Router } from "express";
import middlewares from "../middlewares";
import { coursesControllers } from "../controllers";
import { courseCreateSchema } from "../schemas";

const coursesRouter: Router = Router();

coursesRouter.post(
    "",
    middlewares.validateBody(courseCreateSchema),
    middlewares.verifyToken,
    middlewares.isAdmin,
    coursesControllers.create
)

coursesRouter.get("", coursesControllers.read);

coursesRouter.post(
    "/:courseId/users/:userId",
    middlewares.verifyToken,
    middlewares.isAdmin,
    middlewares.validateId("params", "userId", "users", "User/course not found"),
    middlewares.validateId("params", "courseId", "courses", "User/course not found"),
    coursesControllers.joinCourse
)

coursesRouter.delete(
    "/:courseId/users/:userId",
    middlewares.verifyToken,
    middlewares.isAdmin,
    middlewares.validateId("params", "courseId", "courses", "User/course not found"),
    middlewares.validateId("params", "userId", "users", "User/course not found"),
    coursesControllers.removeFromCourse
)

coursesRouter.get(
    "/:courseId/users",
    middlewares.verifyToken,
    middlewares.isAdmin,
    coursesControllers.listUsersCourse
)

export default coursesRouter;