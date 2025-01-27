import { configureStore } from '@reduxjs/toolkit';
import userReducer from "@/app/state/user/userSlice"
import alertReducer from "@/app/state/alert/alertSlice"
import productReducer from "@/app/state/product/productSlice"
import feedbackReducer from "@/app/state/feedback/feedbackSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        product: productReducer,
        feedback: feedbackReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
