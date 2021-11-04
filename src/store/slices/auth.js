import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../api/auth";

const {createSlice} = require("@reduxjs/toolkit");
const initialState = {
    userInfo: null,
    token: null,
    pending: false,
    success: false,
    error: false,
}
export const login = createAsyncThunk("auth/login", async (params, thunkAPI) => {
    const res = await authAPI.getUserInfo(params);
    return res.data;
})
const auth = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        logout(state) {
            state.isLoading = false;
            state.token = null;
            state.userInfo = null;
            state.success=false;
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.pending = true
        },
        [login.rejected]: (state, action) => {
            state.error = true
        },
        [login.fulfilled]: (state, action) => {
            state.success = true;
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        }
    }
})
export default auth.reducer;
export const {logout} = auth.actions;