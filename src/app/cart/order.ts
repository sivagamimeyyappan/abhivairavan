export class Order{
    no: string;
    name: String;
    customerid: String;
    customername: String;
    date: String;
    status: String;
    items = [];
    cartTotal: number = 0;
    taxPercentages: any = new Object();
}