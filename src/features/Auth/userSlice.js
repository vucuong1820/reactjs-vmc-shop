import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";
export const register = createAsyncThunk('user/register', async (payload) => {
    // call api
    const data = await userApi.register(payload)
    // save to localStorage
    localStorage.setItem(StorageKeys.TOKEN,data.jwt)
    localStorage.setItem(StorageKeys.USER,JSON.stringify(data.user))

    // return data
    return data.user;
})

export const login = createAsyncThunk('user/login', async (payload) => {
   try {
        // call api
        const data = await userApi.login(payload)
        // save to localStorage
        localStorage.setItem(StorageKeys.TOKEN,data.jwt)
        localStorage.setItem(StorageKeys.USER,JSON.stringify(data.user))

        // return data
        return data.user;
   } catch (error) {
       console.log('Failed to fetch api user login: ', error);
   }
})

const counterSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) ||{},
        settings: {},
    },
    reducers: {
        logout(state){
            // clear storage
            localStorage.removeItem(StorageKeys.USER)
            localStorage.removeItem(StorageKeys.TOKEN)
            
            state.current = {}
        }
    },
    extraReducers: {
        // 'user/register/fullfiled'
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },
        // 'user/register/fullfiled'
        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        },
    }
})

const { actions, reducer } = counterSlice;
export const { logout } = actions;
export default reducer;
