import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface VerifyState {
    count: number;
}

const initialState: VerifyState = {
    count: 0,
};

const verifySlice = createSlice({
    name: "verify",
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        increment: (state) => {
            state.count += 1;
        },
    },
});

export const { setCount, increment } = verifySlice.actions;
export default verifySlice.reducer;
