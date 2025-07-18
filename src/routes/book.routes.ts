import {Router} from "express";
import {getAllBooks, getBook, saveBook} from "../controllers/book.controller";


const bookRouter: Router = Router();

bookRouter.get("/all", getAllBooks);
bookRouter.post("/save", saveBook);
bookRouter.get("/:id", getBook);
/*
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
*/

export default bookRouter