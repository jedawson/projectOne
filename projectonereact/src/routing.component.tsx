import React from 'react';
import { Route, Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import AddReimbursementComponent from './reimbursement/add-reimbursement.component';
//import EditReimbursementComponent from './reimbursement/edit-reimbursement.component';
import TableComponent from './reimbursement/table.component';
import LoginComponent from './user/login.component';
import userService from './user/user.service';
import ReimbursementDetailComponent from './reimbursement/reimbursementdetail.component';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import ErrorBoundaryComponent from './error.component';

export default function RouterComponent() {
	const userSelector = (state: UserState) => state.user;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	function logout() {
		userService.logout().then(() => {
			dispatch(getUser(new User()));
			history.push('/reimbursements');
		});
	}
	return (
		<div>
			<header>
				<h1> Tuition Reimbursement Management System</h1>
				<nav id='nav'>
					<ul>
						{user.role === 'Employee' && (
							<li>
								<Link to='/addReimbursement'>Add Reimbursement</Link>
							</li>
						)}
						{user.role && (
							<li>
								<Link to='/reimbursements'>View Reimbursements</Link>
							</li>
						)}
						
						<li>
							{user.name ? (
								<button className='link' onClick={logout}>
									Logout
								</button>
							) : (
								<Link to='/login'>Login</Link>
							)}
						</li>
					</ul>
				</nav>
				<div id='restForm'></div>
			</header>

        <ErrorBoundaryComponent>
        <Route
			path='/addReimbursement'
			render={() =>
				user.role !== 'Employee' ? (
					<Redirect to='/reimbursements' />
				) : (
					<AddReimbursementComponent />
				)
			}
		/>
		<Route
			exact
			path='/reimbursements/:id'
			component={ReimbursementDetailComponent}
        />
		{user.name && (
			<Route exact path='/reimbursements' component={TableComponent} />
		)}
		
	    <Route path='/login' component={LoginComponent} />
        </ErrorBoundaryComponent>
      
		</div>
	);
}
