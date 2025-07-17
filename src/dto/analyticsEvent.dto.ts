export interface AnalyticsEventDto {
    id: number;
    user?: string; // ObjectId as string
    eventType: string;
    eventData: object;
    createdAt: Date;
}