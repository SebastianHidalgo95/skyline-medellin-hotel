export type SearchParams = {
    hotelId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    guests?: number;
    country?: { name: string; id: number };
    state?: { name: string; id: number };
    city?: { name: string; id: number };
}