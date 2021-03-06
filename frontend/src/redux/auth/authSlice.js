import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = localStorage.getItem('user')

const initialState = {
    user:user ? JSON.parse(user) : null,
    isError: false,
    isSuccess: false,
    isLoading : false,
    message: '',
    access_token: '',
};

// Register user
export const register = createAsyncThunk('auth/signup',async (user,thunkAPI)=>{
    try {
       return await authService.register(user); 
    } catch (err) {
        const {message} = err;
        return thunkAPI.rejectWithValue(message);
    }
})


// Login user
export const login = createAsyncThunk('auth/signin',async (user,thunkAPI)=>{

    try {
       return await authService.login(user); 
    } catch (err) {
        const message = err.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

//Logout
export const logout = createAsyncThunk('auth/logout',async () =>{
    await authService.logout()
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset : (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
                state.access_token = action.payload.access_token
            })
            .addCase(register.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.access_token = ''
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user = null

            })
            .addCase(login.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
                state.access_token = action.payload.access_token
            })
            .addCase(login.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.access_token = ''
            })
    }
})

export const {reset} = authSlice.actions;

export default authSlice.reducer