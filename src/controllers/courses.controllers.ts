import { Request, Response } from "express";
import { coursesServices } from "../services";
import { Course, CourseRead, UserCoursesRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course: Course = await coursesServices.create(req.body);

    return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const courses: CourseRead = await coursesServices.read();
    return res.status(200).json(courses);
}

const joinCourse = async (req: Request, res: Response): Promise<Response> => {
    const message: string = await coursesServices.joinCourse(
        req.params.courseId,
        req.params.userId,
    );

    return res.status(201).json({ message });
}

const removeFromCourse = async (req: Request, res: Response): Promise<Response> => {
    await coursesServices.removeFromCourse(
        req.params.courseId,
        req.params.userId,
    );

    return res.status(204).json()
}

const listUsersCourse = async (req: Request, res: Response): Promise<Response> => {
    const listUsers: UserCoursesRead = await coursesServices.listUsersCourse(req.params.courseId);

    return res.status(200).json(listUsers);
}

export default { create, read, joinCourse, removeFromCourse, listUsersCourse };