import {Router} from "express";
import {deleteBook, getAllBooks, getBook, saveBook, updateBook,} from "../controllers/book.controller";


const bookRouter: Router = Router();

bookRouter.get("/all", getAllBooks);
bookRouter.post("/save", saveBook);
bookRouter.get("/:id", getBook);
bookRouter.put("/update/:id", updateBook);
bookRouter.delete("/delete/:id", deleteBook);


export default bookRouter