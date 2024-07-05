import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<Record<"userId", string>>) => {
      state.userId = action.payload.userId
    },
  },
})

export const { setUserId } = userSlice.actions

export default userSlice.reducer