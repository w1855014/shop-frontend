import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/address.api.js'

export const fetchAddresses = createAsyncThunk(
    'addresses/fetchAddresses',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await api.getAllAddresses(userId)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const createAddress = createAsyncThunk(
    'addresses/createAddress',
    async ({ userId, address }, { rejectWithValue }) => {
        try {
            const response = await api.createAddress(userId, address)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const deleteAddress = createAsyncThunk(
    'addresses/deleteAddress',
    async ({ userId, addressId }, { rejectWithValue }) => {
        try {
            const response = await api.deleteAddress(userId, addressId)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

const addressSlice = createSlice({
    name: 'addresses',
    initialState: {
        addresses: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.addresses = action.payload.addresses
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.errors[0]
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.addresses.push(action.payload.address)
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.addresses = state.addresses
                    .filter(address => address.id !== action.payload)
            })
    }
})

export default addressSlice.reducer