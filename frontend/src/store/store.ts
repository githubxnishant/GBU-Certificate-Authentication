import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import menuReducer from "./menuSlice";
import tabReducer from "./tabSlice";
import adminReducer from "./adminSlice";
import verifyReducer from "./verifySlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["menu", "tab", "admin", "verify"] 
};

const rootReducer = combineReducers({
    menu: menuReducer,
    tab: tabReducer,
    admin: adminReducer,
    verify: verifyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/FLUSH",
                    "persist/REGISTER"
                ]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;