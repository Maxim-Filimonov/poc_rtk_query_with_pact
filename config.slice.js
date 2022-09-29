import {createSlice} from '@reduxjs/toolkit';

// create config slice for redux
const configSlice = createSlice({
  name: 'config',
  initialState: {
    url: 'https://pokeapi.co/api/v2',
  },
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const {setUrl} = configSlice.actions;
export default configSlice;
