import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import tabReducer from "./tabSlice"

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        tab: tabReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;