export interface PreOrderDto {
    id: number;
    user: string; // ObjectId as string
    book: string; // ObjectId as string
    status: 'pending' | 'fulfilled';
    createdAt: Date;
    updatedAt: Date;
}