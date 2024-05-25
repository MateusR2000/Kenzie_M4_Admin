import format from "pg-format";
import { 
    User,
    UserCoursesRead,
    UserCoursesReturn,
    UserCreate,
    UserRead,
    UserResult,
    UserReturn,
} from "../interfaces";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas";
import { hash } from "bcryptjs";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);

    const queryString: string = format(
        'INSERT INTO "users" (%I) VALUES(%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );

    const query: UserResult = await client.query(queryString);
    return userReturnSchema.parse(query.rows[0]);
};

const read = async (): Promise<UserRead> => {
    const query: UserResult = await client.query('SELECT * FROM "users";')
    return userReadSchema.parse(query.rows);
};

const listCoursesUser = async(userId: string): Promise<UserCoursesRead> => {
    const queryString: string = `
        SELECT
            "uc"."courseId",
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse",
            "uc"."userId",
            "u"."name" AS "userName"
        FROM "userCourses" "uc"
        JOIN "courses" "c"
            ON "uc"."courseId" = "c"."id"
        JOIN "users" "u"
            ON "uc"."userId" = "u"."id"
        WHERE "u".id = $1;
    `;

    const query: UserCoursesReturn = await client.query(queryString, [userId]);
    return query.rows;
}


export default { create, read, listCoursesUser };
