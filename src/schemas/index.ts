import { userSchema, 
        userCreateSchema,
        userUpdateSchema, 
        userReturnSchema, 
        userReadSchema,
} from "./user.schemas";
import { sessionCreate } from "./session.schemas";
import { courseSchema, courseCreateSchema, courseReadSchema, userCoursesSchema, userCoursesReadSchema } from "./courses.schemas";

export {
    userSchema,
    userCreateSchema,
    userReadSchema,
    userReturnSchema,
    userUpdateSchema,
    sessionCreate,
    courseSchema,
    courseCreateSchema,
    courseReadSchema,
    userCoursesSchema,
    userCoursesReadSchema
}