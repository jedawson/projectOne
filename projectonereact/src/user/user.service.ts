import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = process.env.REACT_APP_SERVER_URI+'/users';
    }
    getLogin(): Promise<User> {
        // withCredentials sends our cookies with the request.
        console.log(this.URI)
        return axios.get(this.URI, {withCredentials: true}).then(result=>{
            console.log(result);
            return result.data
        });
    }

    login(user: User): Promise<User> {
        return axios.post(this.URI, user, {withCredentials: true}).then(result => result.data);
    }
    logout(): Promise<null> {
        return axios.delete(this.URI, {withCredentials: true}).then(result => null);
    }

    updateUser(user: User): Promise<null> {
        return axios.put(this.URI, user, {withCredentials: true}).then(result => result.data);
    }

    getUserByName(name: string): Promise<User> {
        return axios.get(this.URI+'/'+name, {withCredentials: true}).then(result=>{
            return result.data
        });
    }
}

export default new UserService();