import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TabState {
    activeTab: string;
}

const initialState: TabState = {
    activeTab: 'dashboard',
};

const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<string>) {
            state.activeTab = action.payload;
        },
    }
});

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;