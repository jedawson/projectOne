import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        this.doc = dynamo; 
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'trmsUsers'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }

    async getUserByName(name: string): Promise<User | null> {
        const params = {
            TableName: 'trmsUsers',
            Key: {
                'name': name
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            } else {
                return null;
            }
        })
    }

    async addUser(user: User): Promise<boolean> {
        const params = {
            TableName: 'trmsUsers',
            Item: user,
            ConditionExpression: '#name <> :name',
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': user.name,
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

    async updateUser(user: User) {
        const params = {
            TableName: 'trmsUsers',
            Key: {
                'name': user.name
            },
            UpdateExpression: 'set availableAmount = :a',
            ExpressionAttributeValues: {
                ':a': user.availableAmount
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.debug(data);
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService();
export default userService;
