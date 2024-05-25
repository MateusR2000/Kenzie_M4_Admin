import { Request, Response } from "express";
import { userServices } from "../services";
import { UserReturn, UserRead, UserCoursesRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await userServices.create(req.body);
    return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await userServices.read();
    return res.status(200).json(users);
};

const listCoursesUser = async (req: Request, res: Response): Promise<Response> => {
    const listCourses: UserCoursesRead = await userServices.listCoursesUser(req.params.courseId);
    return res.status(200).json(listCourses);
}


export default { create, read, listCoursesUser };