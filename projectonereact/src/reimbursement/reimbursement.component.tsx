import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './reimbursement.css';
import { Approval, Reimbursement } from './reimbursement';
import { approvalStatus } from './reimbursementdetail.component';

interface ReimbursementProps {
    data: Reimbursement;
}

function ReimbursementComponent(props: ReimbursementProps) {
    const history = useHistory();

    function goToReimbursement() {
        history.push('/reimbursements/'+props.data.key);
    }
    return (
        <tr>
            <td>{props.data.description } </td>
            <td>{(props.data.supervisorApproval.denied || props.data.headApproval.denied || props.data.benCoApproval.denied) ? 'Denied' : props.data.approved ? 'Approved' : 'Pending'}</td>
            <td>{props.data.gradingResult ? 'Yes' : 'No'} </td>
            <td>{props.data.eventType } </td>
            <td>{props.data.reimbursementCovered } </td>
            <td>{approvalStatus(props.data.supervisorApproval)}</td>
            <td>{approvalStatus(props.data.headApproval)}</td>
            <td>{approvalStatus(props.data.benCoApproval)}</td>
            <td>
                <Link to={`/reimbursements/${props.data.key}`}>
                    {' '}
                    See more info{' '}
                </Link>
            </td>
        </tr>
    );
}

export default ReimbursementComponent;
