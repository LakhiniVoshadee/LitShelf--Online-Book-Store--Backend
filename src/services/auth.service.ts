import {User} from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string // access the secret from the .env file;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

const refreshTokens = new Set<string>

const adminUser: User = {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("1234", 10), // 10 is the salt
    role: 'admin'
}

const customerUser: User = {
    id: 2,
    username: "customer",
    password: bcrypt.hashSync("12345", 10), // 10 is the salt
    role: 'customer'
}

const userList: User[] = [];

userList.push(adminUser);
userList.push(customerUser);

export const authenticateUser = (username: string, password: string) => {

    const existingUser: User | undefined = userList.find(user => user.username === username);


    let isValidPassword = undefined != existingUser && bcrypt.compareSync(password, existingUser?.password);
    if (!existingUser || !isValidPassword) {
        return null;
    }
    const accesstoken = jwt.sign({
        id: existingUser.id,
        username: existingUser.username,
        role: existingUser.role
    }, JWT_SECRET, {expiresIn: '10s'})

    const refreshtoken = jwt.sign({
        username: existingUser.username,
    }, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

    refreshTokens.add(refreshtoken);

    return {accesstoken,refreshtoken};
}