import { createSlice } from "@reduxjs/toolkit";


const loadInitialState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return null; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

const initialState = {
  user: loadInitialState(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
