import { Url } from '@/lib/Url';
import { UserData } from '@/lib/InterfaceData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface userState {
    user: UserData | null
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
};


const initialState: userState = {
    user: null,
    status: "idle",
    error: null,
};

export const login = createAsyncThunk("users/logging", async (token:string):Promise<UserData> => {
           
    const response = await axios.post(Url.whoConnected, {
        token
    });
    return response.data;
})


export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: { 
        logout: (state):void => {
            localStorage.removeItem("token")
            state.user = null,
            state.status="idle"
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending,(state):void=> {
                state.status = "loading";
            })
        
            .addCase(login.fulfilled, (state, action):void => {
                state.status = "success";
                state.user = action.payload;
            })

            .addCase(login.rejected, (state, action):void => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });

        
    },
})

// Action creators are generated for each case reducer function

export const selectUser = (state: any):UserData => state.user.user;
export const selectUserStatus = (state: { user: { status:"idle" | "loading" | "success" | "failed"; }; }) => state.user.status;

export const { logout } = userSlice.actions;

export default userSlice.reducer;