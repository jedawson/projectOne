import { Reimbursement } from "../reimbursement/reimbursement";
import reimbursementService from "../reimbursement/reimbursement.service";


let r1 = new Reimbursement();
r1.key = '1610991796284';
r1.employee = 'jamesbond';
r1.date = '2021-01-01';
r1.time = '01:01';
r1.location = 'london';
r1.description = 'DB11 Driving Certificate';
r1.cost = 100;
r1.gradingFormat = 'grade';
r1.eventType = 'Certification';
r1.reimbursementPercentage = 1;
r1.reimbursementCovered = 100;
r1.justification = 'to drive well';
r1.supervisor = 'Q';
r1.supervisorApproval.approved = true;
r1.supervisorApproval.name = 'Q';
r1.supervisorApproval.role = 'Supervisor'
r1.head = 'M';
r1.headApproval.approved = true;
r1.headApproval.name = 'M';
r1.headApproval.role = 'Head'
r1.benCo = 'GCHQ'
r1.benCoApproval.approved = true;
r1.benCoApproval.name = 'GCHQ';
r1.benCoApproval.role = 'BenCo';
r1.approved = true;
r1.gradingResult = 'A';
r1.gradingPassed = true;

let r2 = new Reimbursement();
r2.key = '1610991796281';
r2.employee = 'jamesbond';
r2.date = '2021-01-02';
r2.time = '01:02';
r2.location = 'la';
r2.description = 'Bagpipe Flamethrower';
r2.cost = 100;
r2.gradingFormat = 'grade';
r2.eventType = 'Certification Preparation Classes';
r2.reimbursementPercentage = .75;
r2.reimbursementCovered = 75;
r2.justification = 'to prepare for certification';
r2.supervisor = 'Q';
r2.supervisorApproval.approved = true;
r2.supervisorApproval.name = 'Q'
r2.supervisorApproval.role = 'Supervisor'
r2.head = 'M';
r2.headApproval.denied = true
r2.headApproval.denialReason = 'flamethrowers are too dangerous'
r2.headApproval.name = 'M'
r2.headApproval.role = 'Head'
r2.benCo = 'GCHQ'

let r3 = new Reimbursement();
r3.key = '1610991796282';
r3.employee = 'jamesbond';
r3.date = '2021-01-03';
r3.time = '01:03';
r3.location = 'Paris';
r3.description = 'Laser Watch';
r3.cost = 100;
r3.gradingFormat = 'grade';
r3.eventType = 'Seminars';
r3.reimbursementPercentage = .6;
r3.reimbursementCovered = 60;
r3.justification = 'to learn how to use the laser watch';
r3.supervisor = 'Q';
r3.supervisorApproval.denied = true
r3.supervisorApproval.denialReason = 'laser is too close to fingers'
r3.supervisorApproval.name = 'Q'
r3.supervisorApproval.role = 'Supervisor'
r3.head = 'M';
r3.benCo = 'GCHQ'

let r4 = new Reimbursement();
r4.key = '1610991796283';
r4.employee = 'jamesbond';
r4.date = '2021-01-03';
r4.time = '01:03';
r4.location = 'Rome';
r4.description = 'Jetpack';
r4.cost = 100;
r4.gradingFormat = 'grade';
r4.eventType = 'Technical Training';
r4.reimbursementPercentage = .9;
r4.reimbursementCovered = 90;
r4.justification = 'to learn how to fly';
r4.supervisor = 'Q';
r4.supervisorApproval.approved = true
r4.supervisorApproval.name = 'Q'
r4.supervisorApproval.role = 'Supervisor'
r4.head = 'M';
r4.headApproval.approved = true;
r4.headApproval.name = 'M'
r4.headApproval.role = 'Head'
r4.benCo = 'GCHQ'
r4.benCoApproval.needMoreInfo = 'employee'

function populateReimbursementTable() {
    reimbursementService.addReimbursement(r1).then(()=>{});
    reimbursementService.addReimbursement(r2).then(()=>{});
    reimbursementService.addReimbursement(r3).then(()=>{});
    reimbursementService.addReimbursement(r4).then(()=>{});
}

populateReimbursementTable()