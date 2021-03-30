export interface User{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    passwordHash:string;
    passwordSalt:string;
    status:boolean;
}