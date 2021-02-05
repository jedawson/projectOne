export class User {
    name = '';
    password = '';
    role: string = '';
    boss: string = '';
    bosses: string[] = [''];
    availableAmount?: Amount;
}

export class Amount {
    pending: number = 0;
    approved: number = 0;
    total: number = 1000;
}