import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { ReimbursementState, UserState } from '../reducer';
import './reimbursement.css';
import { Form } from 'react-bootstrap';
import reimbursementService from './reimbursement.service';
import { changeReimbursement } from '../actions';
import { Reimbursement } from './reimbursement';
import userService from '../user/user.service';

// This is the prop I want to connect from redux
const reimbursementProp = (state: ReimbursementState) => ({reimbursement: state.reimbursement});
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateReimbursement: (reimbursement: Reimbursement) => changeReimbursement(reimbursement),
};
// Put them in the connector
const connector = connect(reimbursementProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

const eventTypes = {
    "University Courses 80%": .8, 
    "Seminars 60%": .6, 
    "Certification Preparation Classes 75%": .75, 
    "Certification 100%": 1, 
    "Technical Training 90%": .9, 
    "Other 30%": .3
}

function AddReimbursementComponent(props: PropsFromRedux) {
    const userSelector = (state:UserState) => state.user;
    const employee = useSelector(userSelector)
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...props.reimbursement };
        if ((e.target as HTMLInputElement).name === 'eventType'){
            r['eventType'] = (e.target as HTMLInputElement).value.split(',')[0].split(' ').slice(0, -1).join(' ')
            r['reimbursementPercentage'] = (e.target as HTMLInputElement).value.split(',')[1]
            r['reimbursementCovered'] = r['cost'] * r['reimbursementPercentage']
            props.updateReimbursement(r)
        } else {
            r[
                (e.target as HTMLInputElement).name
            ] = (e.target as HTMLInputElement).value;
            if ((e.target as HTMLInputElement).name === 'cost') {
                r['reimbursementCovered'] = r['cost'] * r['reimbursementPercentage']
            }
            props.updateReimbursement(r);
        }
    }
    function submitForm() {
        props.reimbursement.employee = employee.name
        props.reimbursement.supervisor = employee.boss
        props.reimbursement.head = employee.bosses[1]
        props.reimbursement.benCo = employee.bosses[2]
        let e: any = {...employee};
        e.availableAmount.pending += Number(props.reimbursement.reimbursementCovered)

        reimbursementService.addReimbursement(props.reimbursement).then(() => {
            props.updateReimbursement(new Reimbursement());
            // call the callback function from the parent component so that it will re-render
            history.push('/reimbursements');
            return userService.updateUser(e).then(()=>{})
        });
    }
    return (
        <div className='col reimbursement card'>
            <Form.Label>Pick the event type:</Form.Label>
            <Form.Control as='select' key='input-field-eventType' name='eventType' id='r_eventType' onChange={handleFormInput}>
                {Object.entries(eventTypes).map((keyValue, index)=>{
                    return (
                        <option 
                            value={`${keyValue[0]},${keyValue[1]}`}
                            key={`input-field-eventType-${keyValue[0]}`}
                            
                        >{keyValue[0]} </option>
                    )
                })}
            </Form.Control>
            <Form.Label>Date</Form.Label>
            <Form.Control type='date' key='input-field-date' name='date' id='r_date' onChange={handleFormInput}></Form.Control>
            <Form.Label>Time</Form.Label>
            <Form.Control type='time' key='input-field-time' name='time' id='r_time' onChange={handleFormInput}></Form.Control>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' key='input-field-location' name='location' id='r_location' onChange={handleFormInput}></Form.Control>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' key='input-field-description' name='description' id='r_description' onChange={handleFormInput}></Form.Control>
            <Form.Label>Cost</Form.Label>
            <Form.Control type='number' key='input-field-cost' name='cost' id='r_cost' onChange={handleFormInput}></Form.Control>
            <Form.Label>Justification</Form.Label>
            <Form.Control type='text' key='input-field-justification' name='justification' id='r_justification' onChange={handleFormInput}></Form.Control>
            <Form.Label>Grading Format</Form.Label>
            <Form.Check type='radio' name='gradingFormat' key='input-field-gradingFormat-presentation' id='r_gradingFormatPresentation' label='Presentation' value='presentation' onChange={handleFormInput}></Form.Check>
            <Form.Check type='radio' name='gradingFormat' key='input-field-gradingFormat-grade'id='r_gradingFormatGrade' label='Grade' value='grade' onChange={handleFormInput}></Form.Check>
            <Form.Label>Projected Reimbursement Amount</Form.Label>
            <Form.Control type='text' key='input-field-reimbursementCovered' name='reimbursementCovered' id='r_reimbursementCovered' value={props.reimbursement.reimbursementCovered} readOnly></Form.Control>
            <button className='btn btn-primary' onClick={submitForm}>
                Add Reimbursement
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddReimbursementComponent);
