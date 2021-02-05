import logger from '../log';
import userService from './user.service';

export class Amount {
    public pending: number = 0;
    public approved: number = 0;
    public total: number = 1000;
    constructor(){

    }
}

export class User {
    public role: string = 'Customer';
    public availableAmount?: Amount;
    constructor(public name: string, public password: string, role: string, public boss:string, public bosses:string[]) {
        if (role) {
            this.role = role;
            if (role == 'Employee') {
                this.availableAmount = new Amount();
            }
        }
    };
}

export async function login(name: string, password: string): Promise<User|null> {
    logger.debug(`${name +' '+ password}`);
    return await userService.getUserByName(name).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}

export function register(username: string, password: string, supervisor: string, bosses: string[], callback: Function) {
    userService.addUser(new User(username, password, 'Employee', supervisor, bosses)).then((res) => {
        logger.trace(res);
        callback();
    }).catch((err) => {
        logger.error(err);
        console.log('Error, this probably means that the username is already taken.')
        callback();
    });
}

export function updateUser(user: User) {
    userService.updateUser(user).then((success) => {
        logger.info('user updated successfully');
    }).catch((error) => {
        logger.warn('user not updated');
    });
}