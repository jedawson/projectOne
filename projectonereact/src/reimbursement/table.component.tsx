import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Reimbursement } from './reimbursement';
import ReimbursementComponent from './reimbursement.component';
import {ReimbursementState, UserState } from '../reducer'
import { thunkGetReimbursements, thunkGetUser } from '../thunks';
import { Table } from 'react-bootstrap'

export default function TableComponent() {
    // Create a constant that is of the type of state.reimbursements
    const selectReimbursement = (state: ReimbursementState) => state.reimbursements;
    // Retrieve the reimbursements array from redux.
    const reimbursements = useSelector(selectReimbursement);
    // Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
    const dispatch = useDispatch();
    const userContext = useSelector((state: UserState) => state.user);

    useEffect(() => {
        dispatch(thunkGetReimbursements())
        dispatch(thunkGetUser())
    }, [dispatch, thunkGetUser, thunkGetReimbursements])

    return (
        <div>
            <p>Welcome, {userContext.name}. Your role is: {userContext.role}. </p>
            {userContext.role === 'Employee' && (
                <>
                    <Table id='money'>
                        <thead>
                            <tr>
                                <th>Available Reimbursement</th>
                                <th>Total Amount</th>
                                <th>Pending Amount</th>
                                <th>Approved Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{(userContext.availableAmount?.total ?? 0) - (userContext.availableAmount?.pending ?? 0) - (userContext.availableAmount?.approved ?? 0)}</td>
                                <td>{userContext.availableAmount?.total}</td>
                                <td>{userContext.availableAmount?.pending}</td>
                                <td>{userContext.availableAmount?.approved}</td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
            
            <Table striped bordered hover id='reimbursements'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Current Status</th>
                        <th>Grade/Project Submitted</th>
                        <th>Event Type</th>
                        <th>Reimbursement Covered</th>
                        <th>Supervisor Approval Status</th>
                        <th>Department Head Approval Status</th>
                        <th>Benefit Coordinator Approval Status</th>
                        <th>More Info</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((rest: Reimbursement, index: number) => 
                        <ReimbursementComponent key = {'rest-'+index} data = {rest}></ReimbursementComponent>)
                    }
                </tbody>
            
            </Table>
        </div>
    );
}
