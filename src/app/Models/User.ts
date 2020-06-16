export class User{
    userId: string;
    password: String;
    email: String;
    phone: String;
    isAdmin: boolean = false;
    signupDate: Date;
    accessDate: Date;
    loggedIn: boolean = false;
}