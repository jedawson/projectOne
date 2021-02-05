import {AppState} from './reducer';
import {AppAction, getReimbursements, getUser} from './actions';
import {ThunkAction} from 'redux-thunk';
import reimbursementService from './reimbursement/reimbursement.service';
import userService from './user/user.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetReimbursements = (): AppThunk => async dispatch => {
    const asyncResp = await reimbursementService.getReimbursements();
    console.log('before thunk dispatch');
    dispatch(getReimbursements(asyncResp));
}

export const thunkGetUser = (): AppThunk => async dispatch => {
    const asyncResp = await userService.getLogin();
    console.log('before thunk dispatch');
    dispatch(getUser(asyncResp));
}