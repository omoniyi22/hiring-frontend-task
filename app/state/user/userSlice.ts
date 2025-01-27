import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createAlert, setAlert, startLoader, stopLoader } from "../alert/alertSlice";
import { BACKEND_URL } from "../../utils/utils";


let dataStorage: Storage | null;

if (typeof window !== "undefined") {
    dataStorage = window.localStorage
} else {
    dataStorage = null;
}

const initialState: UserState = {
    username: dataStorage?.getItem("username"),
    isAdmin: dataStorage?.getItem("isAdmin"),
    token: dataStorage?.getItem("token")
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            dataStorage?.removeItem("token")
            dataStorage?.removeItem("username")
            dataStorage?.removeItem("isAdmin")
            state.token = null
            state.username = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState | null>) => {
            if (action.payload) {
                state.username = action.payload.username;
                if (action.payload.token) {
                    dataStorage?.setItem("token", action.payload.token)
                    state.token = dataStorage?.getItem("token")
                }
                if (action.payload.username) {
                    dataStorage?.setItem("username", action.payload.username)
                    state.username = action.payload.username
                }
                if (action.payload.isAdmin) {
                    dataStorage?.setItem("isAdmin", action.payload.isAdmin)
                    state.isAdmin = action.payload.isAdmin
                }
            }
        })
    }
})


export const loginUser = createAsyncThunk<
    UserState,
    { name: string; password: string },
    { rejectValue: string }
>(
    'user/loginUser',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.post(`${BACKEND_URL}/auth/signin`, credentials);
            const user: UserState = response.data;
            console.log({ user })
            return user;
        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to log in. Please check your credentials and try again',
                title: "Login Failed",
                status: "ERROR"
            }))
            return rejectWithValue("")
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const RegisterUser = createAsyncThunk(
    'user/register',
    async (credentials: RegisterProps, { dispatch }) => {
        try {
            dispatch(startLoader());
            console.log({ credentials })
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, credentials);
            console.log({ response })
            const user: UserState = response.data;
            dispatch(stopLoader());
            return user;
        } catch (error) {
            let { response }: any = await error;
            let alertdata: Omit<AlertProps, "closeModal">
            dispatch(stopLoader());
            if (response.data.message == "Arguments are invalid.") {
                alertdata = { title: "Wrong sign up data", message: `${response.data.messages.join(" ")}`, status: "ERROR" }
                dispatch(createAlert(alertdata))
            }
            console.log({ register: error })
        }
    }

);
export const { logout } = userSlice.actions;
export default userSlice.reducer;