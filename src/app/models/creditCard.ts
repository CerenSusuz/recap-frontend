export interface CreditCard{
    id?:number;
    customerId:number;
    nameOnTheCard:string;
    cardNumber:string;
    cvv:number;
    expirationDate:string;
}