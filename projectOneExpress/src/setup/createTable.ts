import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import {Amount} from '../user/user'

AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'trmsUsers'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'trmsUsers',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});

let amount = new Amount()
function populateUserTable() {
    userService.addUser({name: 'Al', password: 'pass', role: 'Employee', availableAmount: amount, boss: 'Bo', bosses: ['Bo', 'Cy', 'BenCo']}).then(()=>{});
    userService.addUser({name: 'Bo', password: 'pass', role: 'Supervisor', boss: 'Cy', bosses: ['Cy', 'BenCo']}).then(()=>{});
    userService.addUser({name: 'Cy', password: 'pass', role: 'Head', boss: 'BenCo', bosses:['BenCo']}).then(()=>{});
    userService.addUser({name: 'BenCo', password: 'pass', role: 'BenCo', boss: 'CPO', bosses:['CPO']}).then(()=>{});
}