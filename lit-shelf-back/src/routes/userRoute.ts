import {Router} from "express";
import {
    addUser,
    deleteUser, getAllUser,
    getUser,
    loginUser,
    updateUser,
    userRegister,
    verifyCode
} from "../controller/userController";
import {authenticate} from "../middleware/authenticate";


const router = Router();

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/verifyCode", verifyCode);
router.post("/getUser", getUser);
router.post("/addUser",authenticate,addUser);
router.put("/updateUser",authenticate, updateUser);
router.post("/deleteUser",authenticate,deleteUser);
router.get("/getAllUser",authenticate,getAllUser);

export default router;
