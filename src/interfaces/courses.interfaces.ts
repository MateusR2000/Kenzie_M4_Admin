import { z } from "zod";
import { courseSchema, courseCreateSchema, courseReadSchema, userCoursesReadSchema, userCoursesSchema } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseCreateSchema>;

type CourseRead = z.infer<typeof courseReadSchema>;

type CourseResult = QueryResult<Course>;

type UserCourses = z.infer<typeof userCoursesSchema>;
type UserCoursesRead = z.infer<typeof userCoursesReadSchema>;

type UserCoursesReturn = QueryResult<UserCourses>;


export { Course, CourseCreate, CourseResult, CourseRead, UserCoursesReturn, UserCoursesRead };