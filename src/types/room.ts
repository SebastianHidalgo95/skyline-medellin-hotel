
export type Room = {
    id: string;
    type: string;
    hotelId: string;
    hotelName: string;
    bedrooms: number;
    guests?: number;
    status: string;
    basePrice?: number;
    taxes?: number;
};
