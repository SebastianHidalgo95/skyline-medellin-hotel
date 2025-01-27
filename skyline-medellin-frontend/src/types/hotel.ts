import { City, State } from "react-country-state-city/dist/esm/types";

export type Hotel = {
    id: string;
    name: string;
    address?: string;
    country?: {
        name: string;
        id: number
    };
    state?: State;
    city: City;
    email?: string;
    status?: string;
    phone?: string;
};
