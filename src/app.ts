import "express-async-errors";
import express, { Application, json } from 'express'
import { sessionRouter, userRouter } from './routers';
import middlewares from './middlewares';
import coursesRouter from "./routers/courses.routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);

app.use("/login", sessionRouter);

app.use("/courses", coursesRouter);

app.use(middlewares.handleErrors);

export default app;
