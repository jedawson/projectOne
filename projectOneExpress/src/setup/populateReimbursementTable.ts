import { Reimbursement } from "../reimbursement/reimbursement";
import reimbursementService from "../reimbursement/reimbursement.service";


let r1 = new Reimbursement();
r1.key = '1610989934830';
r1.employee = 'Al';
r1.date = '2021-01-01';
r1.time = '01:01';
r1.location = 'nyc';
r1.description = 'aws cert';
r1.cost = 100;
r1.gradingFormat = 'grade';
r1.eventType = 'Certification';
r1.reimbursementPercentage = 1;
r1.reimbursementCovered = 100;
r1.justification = 'to impress';
r1.supervisor = 'Bo';
r1.head = 'Cy';
r1.benCo = 'BenCo'

let r2 = new Reimbursement();
r2.key = '1610991346926';
r2.employee = 'Al';
r2.date = '2021-01-02';
r2.time = '01:02';
r2.location = 'la';
r2.description = 'aws class';
r2.cost = 100;
r2.gradingFormat = 'grade';
r2.eventType = 'Certification Preparation Classes';
r2.reimbursementPercentage = .75;
r2.reimbursementCovered = 75;
r2.justification = 'to prepare';
r2.supervisor = 'Bo';
r2.head = 'Cy';
r2.benCo = 'BenCo'

let r3 = new Reimbursement();
r3.key = '1610991796280';
r3.employee = 'Al';
r3.date = '2021-01-03';
r3.time = '01:03';
r3.location = 'chi';
r3.description = 'aws seminar';
r3.cost = 100;
r3.gradingFormat = 'grade';
r3.eventType = 'Seminars';
r3.reimbursementPercentage = .6;
r3.reimbursementCovered = 60;
r3.justification = 'to listen to experts';
r3.supervisor = 'Bo';
r3.head = 'Cy';
r3.benCo = 'BenCo'

function populateReimbursementTable() {
    reimbursementService.addReimbursement(r1).then(()=>{});
    reimbursementService.addReimbursement(r2).then(()=>{});
    reimbursementService.addReimbursement(r3).then(()=>{});
}

populateReimbursementTable()