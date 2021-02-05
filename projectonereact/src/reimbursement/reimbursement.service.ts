import axios from 'axios';
import { Reimbursement } from './reimbursement';

class ReimbursementService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = process.env.REACT_APP_SERVER_URI+'/reimbursements';
    }

    getReimbursements(): Promise<Reimbursement []> {
        return axios.get(this.URI, {withCredentials: true}).then(result => result.data);
    }
    getReimbursement(id: string): Promise<Reimbursement> {
        return axios.get(this.URI+'/'+id, {withCredentials: true}).then(result=>result.data);
    }
    addReimbursement(r: Reimbursement): Promise<null> {
        return axios.post(this.URI, r, {withCredentials: true}).then(result => null);
    }
    updateReimbursement(r: Reimbursement): Promise<null> {
        return axios.put(this.URI, r, {withCredentials: true}).then(result => null);
    }

    deleteReimbursement(id: string): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }
}

export default new ReimbursementService();