export interface Rental{
    id?:number;
    carID:number;
    customerID:number;
    rentDate:Date;
    returnDate?:Date;
    rentBeginDate:Date;
    rentEndDate?:Date;
    
}