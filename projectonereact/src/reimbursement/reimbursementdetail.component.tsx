import { useEffect, SyntheticEvent, MouseEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Reimbursement } from './reimbursement';
import reimbursementService from './reimbursement.service';
import { ReimbursementState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeReimbursement } from '../actions';
import { Form, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Approval } from './reimbursement';
import userService from '../user/user.service';

interface ReimbursementDetailProps {
    match: any;
}

export function approvalStatus(approval: Approval){
    if (approval.approved){
        return 'Approved'
    } else if (approval.denied){
        return `Denied because: ${approval.denialReason}`
    } else if (approval.needMoreInfo) {
        return `Need more info from ${approval.needMoreInfo}`
    } else {
        return 'Pending'
    }
}

export default function ReimbursementDetailComponent(
    props: ReimbursementDetailProps
) {
    const reimbursementSelector = (state: ReimbursementState) => state.reimbursement;
    const rest = useSelector(reimbursementSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params.id);
        reimbursementService.getReimbursement(props.match.params.id).then((rest)=> {
            console.log(rest);
            dispatch(changeReimbursement(rest));
        })
    }, [dispatch, props.match.params.id]);

    function handleDelete() {
        let e: any = {...userContext};
        e.availableAmount.pending -= Number(rest.reimbursementCovered)
        reimbursementService.deleteReimbursement(rest.key).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
            return userService.updateUser(e).then(()=>{})
        });
    }

    function handleApprove(){
        if (userContext.role === 'Supervisor') {
            rest.supervisorApproval.approved = true
            rest.supervisorApproval.denied = false
            rest.supervisorApproval.needMoreInfo = ''
            rest.supervisorApproval.name = userContext.name
            rest.supervisorApproval.role = userContext.role
        }
        if (userContext.role === 'Head') {
            rest.headApproval.approved = true
            rest.headApproval.denied = false
            rest.headApproval.needMoreInfo = ''
            rest.headApproval.name = userContext.name
            rest.headApproval.role = userContext.role
        }
        if (userContext.role === 'BenCo') {
            rest.benCoApproval.approved = true
            rest.benCoApproval.denied = false
            rest.benCoApproval.needMoreInfo = ''
            rest.benCoApproval.name = userContext.name
            rest.benCoApproval.role = userContext.role
            rest.approved = true

        }
        reimbursementService.updateReimbursement(rest).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
        })
    }
    function handleNeedMoreInfo(e:MouseEvent){
        //console.log((e.target as HTMLButtonElement).getAttribute('value'))
        let value = (e.target as HTMLButtonElement).getAttribute('value')
        let r: any = { ...rest };
        if (userContext.role === 'Supervisor') {
            r.supervisorApproval.needMoreInfo = value
            r.supervisorApproval.denied = false
            r.supervisorApproval.approved = false
            r.supervisorApproval.name = userContext.name
            r.supervisorApproval.role = userContext.role
        }
        if (userContext.role === 'Head') {
            r.headApproval.needMoreInfo = value
            r.headApproval.denied = false
            r.headApproval.approved = false
            r.headApproval.name = userContext.name
            r.headApproval.role = userContext.role
        }
        if (userContext.role === 'BenCo') {
            r.benCoApproval.needMoreInfo = value
            r.benCoApproval.denied = false
            r.benCoApproval.approved = false
            r.benCoApproval.name = userContext.name
            r.benCoApproval.role = userContext.role
        }
        reimbursementService.updateReimbursement(r).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
        })
    }
    function handleDeny(){
        if (userContext.role === 'Supervisor') {
            rest.supervisorApproval.denied = true
            rest.supervisorApproval.approved = false
            rest.supervisorApproval.needMoreInfo = ''
            rest.supervisorApproval.name = userContext.name
            rest.supervisorApproval.role = userContext.role
        }
        if (userContext.role === 'Head') {
            rest.headApproval.denied = true
            rest.headApproval.approved = false
            rest.headApproval.needMoreInfo = ''
            rest.headApproval.name = userContext.name
            rest.headApproval.role = userContext.role
        }
        if (userContext.role === 'BenCo') {
            rest.benCoApproval.denied = true
            rest.benCoApproval.approved = false
            rest.benCoApproval.needMoreInfo = ''
            rest.benCoApproval.name = userContext.name
            rest.benCoApproval.role = userContext.role
            rest.approved = false
        }
        reimbursementService.updateReimbursement(rest).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
        })
    }
    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...rest };
        r[
            (e.target as HTMLInputElement).name
        ]['denialReason'] = (e.target as HTMLInputElement).value;
        dispatch(changeReimbursement(r));
    }
    function handleGradeInput(e: SyntheticEvent) {
        let r: any = { ...rest };

        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeReimbursement(r));
    }
    function handleGradeSubmit(e:MouseEvent){
        let value = (e.target as HTMLButtonElement).getAttribute('value');
        console.log(e.target as HTMLButtonElement)
        let r: any = { ...rest };
        r.gradingResult = value;
        reimbursementService.updateReimbursement(rest).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
        })
    }
    function handleInfoSubmit(e:MouseEvent){
        let value = (e.target as HTMLButtonElement).getAttribute('value');
        let r: any = { ...rest };
        r.moreInfo = value;
        reimbursementService.updateReimbursement(rest).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
        })
    }
    function handleGradePassed(e:MouseEvent){
        console.log((e.target as HTMLButtonElement).getAttribute('value'))
        let value = (e.target as HTMLButtonElement).getAttribute('value')
        let r: any = { ...rest };
        r.gradingPassed = value
        
        reimbursementService.updateReimbursement(r).then(() => {
            dispatch(changeReimbursement(new Reimbursement()))
            history.push('/reimbursements');
            return userService.getUserByName(r.employee).then((employee)=>{
                let emp: any = {...employee};
                console.log(emp.availableAmount.pending)
                console.log(emp.availableAmount.approved)
                emp.availableAmount.pending -= Number(r.reimbursementCovered)
                emp.availableAmount.approved += Number(r.reimbursementCovered)
                console.log(emp.availableAmount.pending)
                console.log(emp.availableAmount.approved)
                return userService.updateUser(emp).then(()=>{})
            })
        })
    }
    let date = new Date(rest.date+'T'+rest.time);
    
    return (
        <div className='col reimbursement card'>
            <div className='card-body'>
                <p className='date'>{`Date: ${date.toLocaleDateString('en-us')}`}</p>
                <p className='time'>{`Time: ${date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}`}</p>
                <p className='location'>{`Location: ${rest.location}`}</p>
                <p className='description'>{`Description: ${rest.description}`}</p>
                <p className='gradingFormat'>{`Grading Format: ${rest.gradingFormat}`}</p>
                <p className='gradingResult'>{`Grading Result: ${rest.gradingResult}`} </p>
                <p className='gradingPassed'>{`Grading Passed: ${rest.gradingPassed}`}</p>
                <p className='eventType'>{`Event Type: ${rest.eventType}`}</p>
                <p className='cost'>{`Cost: ${rest.cost}`}</p>
                <p className='reimbursementPercentage'>{`Reimbursement Percentage: ${rest.reimbursementPercentage}`}</p>
                <p className='reimbursementCovered'>{`Reimbursement Covered: ${rest.reimbursementCovered}`}</p>
                <p className='justification'>{`Justification: ${rest.justification}`}</p>
                <p className='supervisor'>{`Supervisor: ${rest.supervisor}`}</p>
                <p className='supervisorApprovalStatus'>{`Supervisor Approval Status: ${approvalStatus(rest.supervisorApproval)}`} </p>
                <p className='head'>{`Department Head: ${rest.head}`}</p>
                <p className='headApprovalStatus'>{`Head Approval Status: ${approvalStatus(rest.headApproval)}`} </p>
                <p className='benCo'>{`Benefit Coordinator: ${rest.benCo}`}</p>
                <p className='benCoApprovalStatus'>{`BenCo Approval Status: ${approvalStatus(rest.benCoApproval)}`} </p>
                <p className='moreInfo'>{`More Info: ${rest.moreInfo}`} </p>
            </div>
            {/* The next section will allow someone to add in more info */}
            {((rest.benCoApproval.needMoreInfo === userContext.role.toLowerCase()) ||
              (rest.headApproval.needMoreInfo === userContext.role.toLowerCase()) || 
              (rest.supervisorApproval.needMoreInfo === userContext.role.toLowerCase())) && (
                <>
                    <Form>
                        <InputGroup>
                            <Form.Control 
                                type='text' 
                                name='moreInfo'
                                placeholder={`Please provide more info`} onChange={handleGradeInput}>
                            </Form.Control>
                            <InputGroup.Append>
                                <Button variant='info' onClick={handleInfoSubmit}> Submit More Info </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </>
            )}

            {/* The next section will get the grade from the employee and allow them to delete the reimbursement. */}
            {userContext.role === 'Employee' && (
                <>
                    {(rest.approved) && (
                        <>
                            <Form>
                                <InputGroup>
                                    <Form.Control 
                                        type='text' 
                                        name='gradingResult'
                                        placeholder={`What is your ${rest.gradingFormat}?`} 
                                        onChange={handleGradeInput}>
                                    </Form.Control>
                                    <InputGroup.Append>
                                        <Button variant='info' onClick={handleGradeSubmit}> {`Submit ${rest.gradingFormat}`} </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </>
                    )}
                    <button className='btn btn-danger' onClick={handleDelete}>
                        Delete Reimbursement
                    </button>
                </>
            )}
            {['Supervisor', 'Head', 'BenCo'].includes(userContext.role) && (
                <>
                    {
                        (
                            (userContext.role === 'BenCo' && rest.headApproval.approved) || 
                            (userContext.role === 'Head' && rest.supervisorApproval.approved) || 
                            userContext.role === 'Supervisor'
                        ) && (
                            <>
                                <button className='btn btn-success' onClick={handleApprove}>Approve</button>
                                <DropdownButton title='Need more info from:' variant='warning'>
                                    <Dropdown.Item type='submit' value='employee' onClick={handleNeedMoreInfo}>Employee</Dropdown.Item>
                                    {['Head', 'BenCo'].includes(userContext.role) && (
                                        <Dropdown.Item type='submit' value='supervisor' onClick={handleNeedMoreInfo}>Supervisor</Dropdown.Item>
                                    )}
                                    {['BenCo'].includes(userContext.role) && (
                                        <Dropdown.Item type='submit' value='head' onClick={handleNeedMoreInfo}>Department Head</Dropdown.Item>
                                    )}
                                </DropdownButton>
                                <Form>
                                    <InputGroup>
                                        <Form.Control 
                                            type='text' 
                                            name={userContext.role === 'Supervisor' ? `supervisorApproval`: userContext.role === 'Head' ? 'headApproval' : 'benCoApproval'}
                                            placeholder='Denial Reason' onChange={handleFormInput}>
                                        </Form.Control>
                                        <InputGroup.Append>
                                            <Button variant='danger' onClick={handleDeny}> Deny </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </>
                        )
                    }
                </>
            )}
            {(userContext.role==='BenCo' && rest.gradingResult) && (
                <>
                    <Button variant='success' value='true' onClick={handleGradePassed}> Grade passed, now award reimbursement </Button>
                    <Button variant='danger' value='false' onClick={handleGradePassed}> Grade failed, now deny reimbursement</Button>
                </>
            )}
        </div>
    );
}
