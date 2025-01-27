import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../types/room';

interface RoomsState {
    rooms: Room[];
}

const initialState: RoomsState = {
    rooms: [],
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload);
        },
        updateRoom: (state, action: PayloadAction<Room>) => {
            const index = state.rooms.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        updateRoomStatus(state, action: PayloadAction<{ id: string; status: string }>) {
            const room = state.rooms.find(room => room.id === action.payload.id);
            if (room) {
                room.status = action.payload.status;
            }
        }
    },
});

export const { addRoom, updateRoom, updateRoomStatus } = roomsSlice.actions;
export default roomsSlice.reducer;