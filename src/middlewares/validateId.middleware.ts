import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { UserResult } from "../interfaces";
import { client } from "../database";
import format from "pg-format";

type BodyOrParams = "body" | "params";

const validateId = (
    bodyOrParams: BodyOrParams,
    idKeyName: string,
    tbName: string,
    errorMsg: string
) => 
async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: string = req[bodyOrParams][idKeyName];
    const queryString: string = format(
        'SELECT * FROM %I WHERE "id" = $1',
        tbName
    );

    const query: UserResult = await client.query(queryString, [id]);

    if (query.rowCount === 0 ){
        throw new AppError(errorMsg, 404);
    }

    res.locals = { ...res.locals, foundData: query.rows[0] };

    return next();
};

export default validateId;