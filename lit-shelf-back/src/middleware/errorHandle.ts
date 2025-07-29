import {NextFunction,Request,Response} from "express";
import mongoose from "mongoose";
import {APIError} from "../error/ApiError";

export  const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof mongoose.Error) {
        res.status(400).json(
            {
                message : err.message
            }
        )
    }

    if(err instanceof APIError) {
        res.status(err.statusCode).json({ message: err.message });
        return
    }
    res.status(500).json({message: "Internal server error"})

}