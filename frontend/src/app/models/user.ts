import {Role} from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email:string;
    role: Role;
}
