export interface ReadingProgressDto {
    id: number;
    user: string; // ObjectId as string
    book: string; // ObjectId as string
    currentPage: number;
    totalPages: number;
    createdAt: Date;
    updatedAt: Date;
}