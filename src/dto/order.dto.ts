export interface OrderDto {
    id: number;
    user: string; // ObjectId as string
    books: { book: string; quantity: number }[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: Date;
    updatedAt: Date;
}