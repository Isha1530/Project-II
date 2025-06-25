import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    noticesList: [],
    loading: false,
    error: null,
    response: null,
};

export const getAllNotices = createAsyncThunk(
    'notice/getAllNotices',
    async ({ id, address }, { rejectWithValue }) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const addNotice = createAsyncThunk(
    'notice/addNotice',
    async ({ fields, address }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteNotice = createAsyncThunk(
    'notice/deleteNotice',
    async (noticeId, { rejectWithValue }) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/Notice/${noticeId}`);
            return noticeId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        clearResponse: (state) => {
            state.response = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetNoticeState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNotices.fulfilled, (state, action) => {
                state.loading = false;
                state.noticesList = action.payload;
            })
            .addCase(getAllNotices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addNotice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNotice.fulfilled, (state) => {
                state.loading = false;
                state.response = "Notice added successfully";
            })
            .addCase(addNotice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNotice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNotice.fulfilled, (state, action) => {
                state.loading = false;
                state.noticesList = state.noticesList.filter(
                    notice => notice._id !== action.payload
                );
                state.response = "Notice deleted successfully";
            })
            .addCase(deleteNotice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearResponse, clearError, resetNoticeState } = noticeSlice.actions;
export default noticeSlice.reducer;