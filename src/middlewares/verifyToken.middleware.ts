import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

const verifyToken = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const auth: string | undefined = req.headers.authorization;
    if(!auth) throw new AppError("Missing bearer token", 401);

    const token: string = auth.split(" ")[1];
    const decoded = verify(token, process.env.SECRET_KEY!);

    res.locals = { ...res.locals, decoded };

    return next();
}

export default verifyToken;