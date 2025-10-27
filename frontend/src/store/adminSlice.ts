import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";

interface Admin {
    _id: string;
    name: string;
    username: string;
}

interface UserState {
    user: Admin | null;
    adminCount: number;
}

const initialState: UserState = {
    user: null,
    adminCount: 0,
};

const adminSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Admin>) => {
            state.user = action.payload;
        },
        setAdminCount(state, action: PayloadAction<number>) {
            state.adminCount = action.payload;
        },
        clearAdmin: (state) => {
            state.user = null;
        }
    }
});

export const logout = (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(clearAdmin());
    window.location.href = "/login";
};

export const { setAdmin, setAdminCount, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;