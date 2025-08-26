import User from "../model/user.model";
import { UserDto } from "../dto/user.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();

export const authenticateUser = async (username: string | undefined, password: string): Promise<{ accesstoken: string; refreshtoken: string } | null> => {
    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return null;
        }

        const isValidPassword = bcrypt.compareSync(password, existingUser.password);
        if (!isValidPassword) {
            return null;
        }

        const accesstoken = jwt.sign(
            {
                id: existingUser.id,
                username: existingUser.username,
                role: existingUser.role,
            },
            JWT_SECRET,
            { expiresIn: "5m" }
        );

        const refreshtoken = jwt.sign(
            { username: existingUser.username },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        refreshTokens.add(refreshtoken);

        return { accesstoken, refreshtoken };
    } catch (error) {
        console.error("Error authenticating user:", error);
        return null;
    }
};

export const saveUser = async (user: UserDto) => {
    try {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const newUser = {
            ...user,
            password: hashedPassword,
        };
        return await User.create(newUser);
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
};

export const updateUser = async (id: number, data: Partial<UserDto>) => {
    try {
        if (data.password) {
            data.password = bcrypt.hashSync(data.password, 10);
        }
        const user = await User.findOneAndUpdate({ id }, data, { new: true });
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const result = await User.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const validateUser = (user: UserDto): string | null => {
    if (!user.id || !user.username || !user.password || !user.role) {
        return "All fields (id, username, password, role) are required";
    }
    if (!["admin", "customer"].includes(user.role)) {
        return "Role must be either 'admin' or 'customer'";
    }
    return null;
};

export const getAllCustomers = async () => {
    try {
        const customers = await User.find({ role: 'customer' }).select('id username role createdAt updatedAt');
        return customers;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

export const getCustomerByName = async (name: string) => {
    try {
        const customers = await User.find({
            role: 'customer',
            username: { $regex: name, $options: 'i' }
        }).select('id username role createdAt updatedAt');
        return customers;
    } catch (error) {
        console.error("Error fetching customer by name:", error);
        throw error;
    }
};