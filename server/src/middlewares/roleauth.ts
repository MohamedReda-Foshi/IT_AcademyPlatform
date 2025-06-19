import { Request, Response, NextFunction } from "express";


export const role  =(...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) : void => {
        console.log('this',req.user?.role)
        const userRole = req.user?.role as string ;
        console.log("User role:", userRole); 
        console.log("Request user:", req.user?.role);
        

        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied" })
            console.log("Access denied for role:", userRole);
            return ;
        }
        next();
    };
}




