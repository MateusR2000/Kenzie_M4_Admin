import { z } from "zod";

const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15),
    description: z.string()
})

const courseCreateSchema = courseSchema.omit({id: true});

const courseReadSchema = courseSchema.array();

// const joinCourseSchema = z.object({
//     courseId: z.number().positive(),
// });

const userCoursesSchema = z.object({
    id: z.number().positive(),
    active: z.boolean().default(true),
    courseId: z.number().positive(),
    userId: z.number().positive()
})

const userCoursesReadSchema = userCoursesSchema.array();


export { courseCreateSchema, courseSchema, courseReadSchema, userCoursesSchema, userCoursesReadSchema };