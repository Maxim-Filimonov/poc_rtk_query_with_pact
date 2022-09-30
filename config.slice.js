import {createSlice} from '@reduxjs/toolkit';

// create config slice for redux
const configSlice = createSlice({
  name: 'config',
  initialState: {
    url: 'https://pokeapi.co/api/v2',
    gqlUrl: 'https://graphqlzero.almansi.me/api',
  },
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setGqlUrl: (state, action) => {
      state.gqlUrl = action.payload;
    },
  },
});

export const {setUrl, setGqlUrl} = configSlice.actions;
export default configSlice;
