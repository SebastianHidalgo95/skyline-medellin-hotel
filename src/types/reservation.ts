import { Guest } from "./guest";

export type Reservation = {
    hotelId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    guests?: Guest[];
    roomId?: string;
    reservationCode: number;
}
