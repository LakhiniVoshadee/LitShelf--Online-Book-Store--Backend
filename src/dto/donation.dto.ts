export interface DonationDto {
    id: number;
    user: string; // ObjectId as string
    book?: string; // ObjectId as string
    amount?: number;
    type: 'book' | 'monetary';
    createdAt: Date;
    updatedAt: Date;
}