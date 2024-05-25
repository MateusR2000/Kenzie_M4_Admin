import format from "pg-format";
import { Course, CourseCreate, CourseResult, CourseRead, UserCoursesRead, UserCoursesReturn } from "../interfaces";
import { client } from "../database";
import { courseReadSchema } from "../schemas";
import { QueryResult } from "pg";
import { AppError } from "../errors";

const create = async (payload: CourseCreate): Promise<Course> => {
    const queryString: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );

    const query: CourseResult = await client.query(queryString);
    return query.rows[0];
};

const read = async(): Promise<CourseRead> => {
    const query: CourseResult = await client.query('SELECT * FROM "courses";');
    return courseReadSchema.parse(query.rows);
};

const joinCourse = async (courseId: string, userId: string): Promise<string> => {
    const query: QueryResult = await client.query(
        'SELECT * FROM "userCourses" WHERE "courseId" = $1 and "userId" = $2;',
        [courseId, userId]
    )

    if(query.rowCount !== 0 && query.rows[0].active === true){
        throw new AppError("User already joined course", 400);
    }

    if(query.rowCount !== 0 && query.rows[0].active === false){
        client.query(`
            UPDATE "userCourses"
            SET active = true
            WHERE "courseId" = $1 and "userId" = $2;
        `,
        [courseId, userId])
    }

    else{
        await client.query(
            'INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2);',
            [courseId, userId]
        );
    }


    return "User successfully vinculed to course"
};

const removeFromCourse = async (courseId: string, userId: string): Promise<void> => {
   const queryString: string = `
        UPDATE "userCourses"
        SET active = false
        WHERE "courseId" = $1 and "userId" =$2; 
   `;
  

    await client.query(queryString, [courseId, userId])
};

const listUsersCourse = async(courseId: string): Promise<UserCoursesRead> => {
    const queryString: string = `
        SELECT
            "uc"."userId",
            "u"."name" AS "userName",
            "uc"."courseId",
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse"
        FROM "userCourses" "uc"
        JOIN "users" "u"
            ON "uc"."userId" = "u"."id"
        JOIN "courses" "c"
            ON "uc"."courseId" = "c"."id"
        WHERE "c".id = $1;
    `;

    const query: UserCoursesReturn = await client.query(queryString, [courseId]);
    return query.rows;
}

export default { create, read, joinCourse, removeFromCourse, listUsersCourse };