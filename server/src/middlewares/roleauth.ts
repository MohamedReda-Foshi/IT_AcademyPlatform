import { Request, Response, NextFunction } from "express";


export const role  =(...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) : void => {
        const userRole = req.user?.role as string ;
     
        

        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied" })
            return ;
        }
        next();
    };
}




