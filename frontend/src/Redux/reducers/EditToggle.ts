import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  Toggle: boolean;
  data: [];
}

// Define the initial state using that type
const initialState: CounterState = {
  Toggle: false,
  data: [],
};

export const EditToggle = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    OpenButton: (state, action) => {
      state.Toggle = true;
      state.data = action.payload;
    },
    CloseButton: (state) => {
      state.Toggle = false;
    },
  },
});

export const { OpenButton, CloseButton } = EditToggle.actions;
export default EditToggle.reducer;
