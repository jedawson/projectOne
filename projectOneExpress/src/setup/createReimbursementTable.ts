import * as AWS from 'aws-sdk';
import reimbursementService from '../reimbursement/reimbursement.service';
import {Approval, Reimbursement} from '../reimbursement/reimbursement'

AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeReimbursements = {
    TableName: 'reimbursements'
}

const reimbursementSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'key',
            AttributeType: 'S'
        },
        {
            AttributeName: 'employee',
            AttributeType: 'S'
        },
        {
            AttributeName: 'supervisor',
            AttributeType: 'S'
        },
        {
            AttributeName: 'head',
            AttributeType: 'S'
        },
        {
            AttributeName: 'benCo',
            AttributeType: 'S'
        },
    ],
    KeySchema: [
        {
            AttributeName: 'key',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'reimbursements',
    StreamSpecification: {
        StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'EmployeeIndex',
            KeySchema: [
                {
                    AttributeName: 'employee',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        },
        {
            IndexName: 'SupervisorIndex',
            KeySchema: [
                {
                    AttributeName: 'supervisor',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        },
        {
            IndexName: 'HeadIndex',
            KeySchema: [
                {
                    AttributeName: 'head',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        },
        {
            IndexName: 'BenCoIndex',
            KeySchema: [
                {
                    AttributeName: 'benCo',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ]
};

ddb.deleteTable(removeReimbursements, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(reimbursementSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Table Created', data);
            }
        });
    }, 5000);
});

