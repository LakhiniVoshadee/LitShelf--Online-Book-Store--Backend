export interface BookDto {
    id: number;
    title: string;
    author: string;
    genre: string;
    price: number;
    currency: string;
    coverImage: string;
    publicationYear: number;
    publisher: string;
    description?: string;
    pages: number;
    language: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
