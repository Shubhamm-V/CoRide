import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  name: string | null;
  email: string | null;
  gender: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  gender: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      delete action.payload.password;
      state = {...action.payload};
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;

export default userSlice.reducer;
