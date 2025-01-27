export type Hotel = {
    id: string;
    name: string;
    address?: string;
    country?: { name: string; id: number };
    state?: { name: string; id: number };
    city?: { name: string; id: number };
    email?: string;
    status?: string;
    phone?: string;
};
