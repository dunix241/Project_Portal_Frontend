import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "./index";

export interface User {
    email: string
}
type AuthState = {
    user: User | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (
            state,
            {
                payload,
            }: any,
        ) => {
            console.log(payload);
            state.user = 'hehe'
            state.token = payload.token
        },
    },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
