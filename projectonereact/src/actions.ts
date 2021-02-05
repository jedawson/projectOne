import {Reimbursement} from './reimbursement/reimbursement';
import {User} from './user/user';

export enum ReimbursementActions {
    GetReimbursements = 'GET_REIMBURSEMENTS',
    ChangeReimbursement = 'CHANGE_REIMBURSEMENT'
}

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN',
    ChangeUser = 'CHANGE_USER'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}

//All of our reimbursement actions need to follow this interface.
export interface ReimbursementAction extends AppAction {
    type: ReimbursementActions;
    payload: Reimbursement | Reimbursement[];
}

export function getReimbursements(rests: Reimbursement[]): ReimbursementAction {
    const action: ReimbursementAction = {
        type: ReimbursementActions.GetReimbursements,
        payload: rests
    }
    return action;
}

export function changeReimbursement(rest: Reimbursement): ReimbursementAction {
    const action: ReimbursementAction = {
        type: ReimbursementActions.ChangeReimbursement,
        payload: rest
    }
    return action;
}

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function changeUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.ChangeUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}