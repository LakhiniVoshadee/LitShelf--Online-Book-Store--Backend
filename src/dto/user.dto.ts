export interface UserDto {
    id: number;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}