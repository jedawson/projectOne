import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Reimbursement, Approval} from './reimbursement';
import { User } from '../user/user'

class ReimbursementService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getReimbursements(user:User): Promise<Reimbursement[]> {
        const params = {
            TableName: 'reimbursements',
            IndexName: `${user.role}Index`,
            KeyConditionExpression: `${user.role[0].toLowerCase()+user.role.slice(1)} = :name`,
            ExpressionAttributeValues: {':name': user.name}
        };
        return await this.doc.query(params).promise().then((data) => {
            return data.Items as Reimbursement[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async getReimbursement(id: string): Promise<Reimbursement | null> {
        const params = {
            TableName: 'reimbursements',
            Key: {
                'key': id
            }
        }
        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Reimbursement;
        }).catch((err) => {
            logger.error(err);
            return null;
        });
    }

    async addReimbursement(rest: Reimbursement): Promise<boolean> {
        const datayorb = { ...rest };
        // delete datayorb.eta;
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'reimbursements',
            // Item - the object we are sending
            Item: datayorb,
            ConditionExpression: '#key <> :key',
            ExpressionAttributeNames: {
                '#key': 'key',
            },
            ExpressionAttributeValues: {
                ':key': datayorb.key,
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateReimbursement(rest: Reimbursement): Promise<boolean> {
        console.log(rest);
        const params = {
            TableName: 'reimbursements',
            Key: {
                'key': rest.key
            },
            UpdateExpression: 'set #supervisorApproval=:sa, #supervisor=:s, #headApproval=:ha, #head=:h, #benCoApproval=:ba, #benCo=:b, #moreInfo=:mi, #approved=:a, #gradingResult=:gr, #gradingPassed=:gp',
            ExpressionAttributeValues: {
                ':sa': rest.supervisorApproval,
                ':s': rest.supervisor,
                ':ha': rest.headApproval,
                ':h': rest.head,
                ':ba': rest.benCoApproval,
                ':b': rest.benCo,
                ':mi': rest.moreInfo,
                ':a': rest.approved,
                ':gr': rest.gradingResult,
                ':gp': rest.gradingPassed,
            },
            ExpressionAttributeNames: {
                '#supervisorApproval': 'supervisorApproval',
                '#supervisor': 'supervisor',
                '#headApproval': 'headApproval',
                '#head': 'head',
                '#benCo': 'benCo',
                '#benCoApproval': 'benCoApproval',
                '#moreInfo': 'moreInfo',
                '#approved': 'approved',
                '#gradingResult': 'gradingResult',
                '#gradingPassed': 'gradingPassed'
            },
            ReturnValue: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.info('Successfully updated reimbursement');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        })
    }

    async deleteReimbursement(id: string): Promise<Boolean> {
        const params = {
            TableName: 'reimbursements',
            Key: {
                'key': id
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }
}

const reimbursementService = new ReimbursementService();
export default reimbursementService;
