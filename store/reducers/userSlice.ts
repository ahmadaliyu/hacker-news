import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface UserState {
  user: {
    username: string;
    password: string;
  }; // Define user type
}

const initialState: UserState = {
  user: {
    username: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
   
  },
 
});

export const selectUserStore = (state: RootState) => state.user;
export const {  } = userSlice.actions;
export default userSlice.reducer;
