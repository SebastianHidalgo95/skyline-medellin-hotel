import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from '../types/hotel';
import initialHotels from '../defaultHotels.json';

interface HotelsState {
  hotels: Hotel[];
}

const initialState: HotelsState = {
  hotels: initialHotels,
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotels.push(action.payload);
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.hotels.findIndex(hotel => hotel.id === action.payload.id);
      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
    },
    updateHotelStatus(state, action: PayloadAction<{ id: string; status: string }>) {
      const hotel = state.hotels.find(hotel => hotel.id === action.payload.id);
      if (hotel) {
        hotel.status = action.payload.status;
      }
    },
  },
});

export const { addHotel, updateHotel, updateHotelStatus } = hotelsSlice.actions;
export default hotelsSlice.reducer;