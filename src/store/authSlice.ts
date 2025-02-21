import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getItem, setItem } from '../utils/local-storage';

export interface User {
    email: string
}
type AuthState = {
    user: User | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: getItem('user') },
    reducers: {
        setCredentials: (
            state,
            {
                payload,
            }: any,
        ) => {
            state.user = payload
            setItem('user', payload)
        },
        logout: (
            state,
            {
                payload,
            }: any,
        ) => {
            console.log('log user out');
            state.user = null
            setItem('user', null)
        },
    },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
