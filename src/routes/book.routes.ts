import {Router} from "express";
import {deleteBook, getAllBooks, getBook, saveBook, updateBook,} from "../controllers/book.controller";
import {authorizeRoles} from "../middleware/auth.middleware";


const bookRouter: Router = Router();

bookRouter.get("/all", getAllBooks);
bookRouter.post("/save", authorizeRoles("admin"), saveBook);
bookRouter.get("/:id", getBook);
bookRouter.put("/update/:id", authorizeRoles("admin"), updateBook);
bookRouter.delete("/delete/:id", authorizeRoles("admin"), deleteBook);


export default bookRouter