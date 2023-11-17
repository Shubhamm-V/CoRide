import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  origin: number | null;
  destination: string | null;
  travelInformation: string | null;
}

const initialState: CounterState = {
  origin: null,
  destination: null,
  travelInformation: null,
};

export const navSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTraverlTimeInformation: (state, action) => {
      state.travelInformation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrigin, setDestination, setTraverlTimeInformation} =
  navSlice.actions;

export default navSlice.reducer;
