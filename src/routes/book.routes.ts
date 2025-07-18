import {Router} from "express";
import {getAllBooks} from "../controllers/book.controller";


const bookRouter: Router = Router();

bookRouter.get("/all", getAllBooks);

export default bookRouter