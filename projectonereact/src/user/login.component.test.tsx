import axios from 'axios';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppAction } from '../actions';
import reducer, { AppState } from '../reducer';
import { Reimbursement } from '../reimbursement/reimbursement';
import LoginComponent from './login.component';
import { User } from './user';

let store: Store<AppState, AppAction>;
let wrapper: ReactWrapper;

beforeEach(()=>{
    store = createStore(
        reducer,
        applyMiddleware(thunk)
    );
    wrapper = mount(<Provider store={store}><BrowserRouter><LoginComponent/></BrowserRouter></Provider>);
})

test('that username and password are set correctly', () => {
    const input = wrapper.find('input').first();
    input.simulate('change', {target: {name: 'username', value:'Richard'}});
    input.simulate('change', {target: {name: 'password', value:'pass'}});
    expect(store.getState().loginUser.name).toBe('Richard');
    expect(store.getState().loginUser.password).toBe('pass');
});

// negative test: Test that something doesn't happen
test('that password is not set when we change username', () => {
    const rest: Reimbursement = Object.assign(new Reimbursement(), store.getState().reimbursement);
    const input = wrapper.find('input').first();
    input.simulate('change', {target: {name: 'username', value:'Richard'}});
    expect(store.getState().loginUser.password).not.toBe('Richard');
    expect(store.getState().reimbursement).toEqual(rest);
});

test('that axios.post is called when login is pressed.', () => {
    axios.post = jest.fn().mockResolvedValue({data:new User()});
    const button = wrapper.find('button');
    button.simulate('click');
    expect(axios.post).toHaveBeenCalled();
});