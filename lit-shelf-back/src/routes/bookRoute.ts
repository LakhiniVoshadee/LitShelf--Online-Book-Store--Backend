import {Router} from "express";
import {addBook, deleteBook, getAllBook, getBook, updateBook} from "../controller/bookController";
import {authenticate} from "../middleware/authenticate";

const bookRoute = Router();
bookRoute.post("/addBook",authenticate,addBook);
bookRoute.put("/updateBook",authenticate, updateBook);
bookRoute.post("/deleteBook",authenticate, deleteBook);
bookRoute.post("/getAll",authenticate, getAllBook);
bookRoute.post("/getBook",authenticate, getBook);
export default bookRoute;
