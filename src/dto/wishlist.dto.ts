export interface WishlistDto {
    id: number;
    user: string; // ObjectId as string
    books: string[]; // Array of ObjectId as strings
    createdAt: Date;
    updatedAt: Date;
}