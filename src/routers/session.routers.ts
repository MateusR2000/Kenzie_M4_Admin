import { Router } from "express";
import middlewares from "../middlewares";
import { sessionCreate } from "../schemas";
import { sessionControllers } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post(
    "",
    middlewares.validateBody(sessionCreate),
    sessionControllers.create
)

export default sessionRouter;