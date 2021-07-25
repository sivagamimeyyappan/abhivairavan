export class User{
    userId: string;
    password: string;
    email: string;
    phone: string;
    isAdmin: boolean = false;
    signupDate: Date;
    accessDate: Date;
    loggedIn: boolean = false;
}