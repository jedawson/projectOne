import * as Actions from './actions';
import { Reimbursement } from './reimbursement/reimbursement';
import { User } from './user/user';

// Define the items that are in our state
export interface ReimbursementState {
    // The list of all reimbursements, loaded from the db.
    reimbursements: Reimbursement[];
    // The specific reimbursement we have selected for view, edit, or add
    reimbursement: Reimbursement;
}
export interface UserState {
    user: User;
    loginUser: User;
}

//removed reimbursementState after extends
export interface AppState extends UserState, ReimbursementState { }

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: AppState = {
    user: new User(),
    loginUser: new User(),
    reimbursements: [],
    reimbursement: new Reimbursement()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
        case Actions.ReimbursementActions.GetReimbursements:
            newState.reimbursements = action.payload as Reimbursement[];
            return newState;
        case Actions.ReimbursementActions.ChangeReimbursement:
            newState.reimbursement = action.payload as Reimbursement;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        default: 
            return state;
    }
}

export default reducer;