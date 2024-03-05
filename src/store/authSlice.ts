import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "./index";
import {useEffect} from "react";

export interface User {
    email: string
}
type AuthState = {
    user: User | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')), token: typeof window !== 'undefined' && localStorage.getItem('token') },
    reducers: {
        setCredentials: (
            state,
            {
                payload,
            }: any,
        ) => {
            // console.log(payload);
            state.user = payload
            state.token = payload.token
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', (state.token));
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        logout: (
            state,
            {
                payload,
            }: any,
        ) => {
            state.token = null
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', null);
            }
        },
    },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
