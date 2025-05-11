import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeRelated/noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteNotice = (noticeId) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTICE_DELETION_REQUEST' });
        
        const { data } = await axios.delete(`/notices/${noticeId}`);
        
        dispatch({
            type: 'NOTICE_DELETION_SUCCESS',
            payload: noticeId
        });
        
        return data;
    } catch (error) {
        dispatch({
            type: 'NOTICE_DELETION_FAIL',
            payload: error.response?.data?.message || error.message
        });
        throw error;
    }
};