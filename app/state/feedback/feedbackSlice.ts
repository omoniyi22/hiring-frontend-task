import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {  setAlert, startLoader, stopLoader } from "../alert/alertSlice";
import { BACKEND_URL } from "../../utils/utils";


let dataStorage: Storage | null;

if (typeof window !== "undefined") {
    dataStorage = window.localStorage
} else {
    dataStorage = null;
}


if (typeof window !== "undefined") {
    dataStorage = window.localStorage
} else {
    dataStorage = null;
}


const initialState: FeedbackState | [] = {
    feedbacks: [],
}
const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createFeedback.fulfilled, (state, action: PayloadAction<FeedBackType | null>) => {
            if (action.payload) {
                state.feedbacks = [...state.feedbacks, action.payload];
            }
        })

        builder.addCase(fetchFeedbacks.fulfilled, (state, action: PayloadAction<FeedBackType[]>) => {
            console.log({ payload: action.payload })
            state.feedbacks = action.payload;
        });
    }
})


export const createFeedback = createAsyncThunk<
    FeedBackType,
    { name: string; customerFeedback: string, feedbackId: string | string[] },
    { rejectValue: string }
>(
    'feedback/createFeedback',
    async (data, { dispatch, rejectWithValue }) => {
        console.log({ data })
        try {
            dispatch(startLoader());
            const response = await axios.post(`${BACKEND_URL}/feedbacks/${data.feedbackId}`, {
                customerName: data.name,
                customerFeedback: data.customerFeedback,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const feedback: FeedBackType = response.data.feedback;
            dispatch(setAlert({
                message: 'Thanks for the feedback',
                title: "feedback Created",
                status: "SUCCESS"
            }));
            return feedback;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to create feedback.',
                title: "Creation Failed",
                status: "ERROR"
            }));
            return rejectWithValue("Error creating feedback");
        } finally {
            dispatch(stopLoader());
        }
    }
);


export const fetchFeedbacks = createAsyncThunk<
    FeedBackType[],
    string | string[],
    { rejectValue: string }
>(
    'feedback/fetchFeedbacks',
    async (feedbackId, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/feedbacks/${feedbackId}`, {
                headers: {
                    Authorization: `${dataStorage?.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data) {
                console.log({ data: response.data })
            } else {
                console.log({ data: "none found yet" })

            }
            const feedbacks: FeedBackType[] = response.data.feedbacks
            return feedbacks;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch Feedbacks, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching feedbacks");
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const getFeedback = createAsyncThunk<
    FeedbackState,
    void,
    { rejectValue: string }
>(
    'feedback/getFeedback',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/feedback`, {
                headers: {
                    Authorization: `${dataStorage?.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            const feedback: FeedbackState = response.data;
            return feedback;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch feedback, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching feedback");
        } finally {
            dispatch(stopLoader());
        }
    }
);


export default feedbackSlice.reducer;