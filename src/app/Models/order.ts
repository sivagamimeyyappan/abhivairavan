export class Order{
    orderId: string;
    name: String;
    userId: String;
    date: Date;
    status: string;
    items = [];
    cartTotal: number = 0;
    cashDiscount: number = 0;
    taxPercentages: any = new Object();
    lastModifiedBy: String;

    constructor(){
        var orderId = Date.now().toString() + Math.floor(Math.random() * 10);
        this.orderId = [orderId.slice(0, 4), orderId.slice(4, 10), orderId.slice(10, orderId.length)].join('-');
        this.status = 'In Cart';
    }
}