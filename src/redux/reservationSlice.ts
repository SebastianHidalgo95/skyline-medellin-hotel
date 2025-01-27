import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '../types/searchParams';
import { Reservation } from '../types/reservation';

interface ReservationState {
    searchParams: SearchParams;
    reservations: Reservation[]
}

const initialState: ReservationState = {
    searchParams: {},
    reservations: []
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        updateSearchParams(state, action: PayloadAction<SearchParams>) {
            state.searchParams = action.payload;
        },
        addReservation(state, action: PayloadAction<Reservation>) {
            Array.isArray(state?.reservations) 
                ? state.reservations.push(action.payload)
                : state.reservations = [action.payload]
        }
    },
});

export const { updateSearchParams, addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;