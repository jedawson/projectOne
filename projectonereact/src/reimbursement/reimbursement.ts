export class Approval {
    name: string = '';
    role: string = '';
    approved: boolean = false;
    denied: boolean = false;
    needMoreInfo: string = '';
    denialReason: string = '';
}

export class Reimbursement {
    key: string = new Date().getTime().toString();
    employee: string = '';
    date: string = '';
    time: string = ''; 
    location: string = ''; 
    description: string = ''; 
    cost: number = 0; 
    gradingFormat: string = ''; 
    gradingResult: string = '';
    gradingPassed: boolean = false;
    eventType: string = '';
    reimbursementPercentage: number = .5;
    reimbursementCovered: number = 0;
    justification: string = ''; 
    supervisorApproval: Approval = new Approval();
    supervisor: string = '';
    headApproval: Approval = new Approval();
    head: string = '';
    benCoApproval: Approval= new Approval();
    benCo: string = '';
    moreInfo: string = '';
    approved: boolean = false;
}


