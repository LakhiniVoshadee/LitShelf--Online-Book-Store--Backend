import {Router} from "express";
import {getAllBooks, saveBook} from "../controllers/book.controller";


const bookRouter: Router = Router();

bookRouter.get("/all", getAllBooks);
bookRouter.post("/save", saveBook);

export default bookRouter