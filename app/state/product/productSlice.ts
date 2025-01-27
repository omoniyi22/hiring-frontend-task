import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert, startLoader, stopLoader } from "../alert/alertSlice";
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


const initialState: ProductState | [] = {
    products: [],
    product: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductType | null>) => {
            if (action.payload) {
                state.products = [action.payload, ...state.products,];
            }
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
            console.log({ payload: action.payload })
            state.products = action.payload;
        });

        builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
            console.log({ payload: action.payload })
            state.product = action.payload;
        });
    }
})


export const createProduct = createAsyncThunk<
    ProductType,
    { cost: string; name: string },
    { rejectValue: string }
>(
    'product/createProduct',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.post(`${BACKEND_URL}/products`, data, {
                headers: {
                    Authorization: `${dataStorage?.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            
            const product: ProductType = response.data.product;
            dispatch(setAlert({
                message: 'product was successfully created',
                title: "product Created",
                status: "SUCCESS"
            }));
            return product;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to create product.',
                title: "Creation Failed",
                status: "ERROR"
            }));
            return rejectWithValue("Error creating product");
        } finally {
            dispatch(stopLoader());
        }
    }
);



export const fetchProducts = createAsyncThunk<
    ProductType[],
    void,
    { rejectValue: string }
>(
    'product/fetchProducts',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/products`, {
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
            const products: ProductType[] = response.data.product;

            return products;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch Products, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching products");
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const getProduct = createAsyncThunk<
    ProductType,
    string | string[],
    { rejectValue: string }
>(
    'product/getProduct',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/products/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const product: ProductType = response.data.product
            return product;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch product, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching product");
        } finally {
            dispatch(stopLoader());
        }
    }
);


export default productSlice.reducer;