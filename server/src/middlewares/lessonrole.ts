// import { Request, Response, NextFunction } from "express";


// export const roleLesson  =(...allowedRoles: string[]) => {
//     return (req: Request, res: Response, next: NextFunction) : void => {
//         const userRole = req.course.type;

//         if (!userRole || !allowedRoles.includes(userRole)) {
//             res.status(403).json({ message: "Access denied" })
//             return ;
//         }
//         next();
//     };
// }

// module.exports =roleLesson;