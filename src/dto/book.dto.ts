export interface BookDto {
    id: number;
    title: string;
    author: string;
    genre: string;
    price: number;
    stock: number;
    description: string;
    coverImage?: string;
    publishedDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}