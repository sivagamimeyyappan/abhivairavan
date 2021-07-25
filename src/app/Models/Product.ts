export class Product{
    productId: string;
    mrp: number = 0;
    category: string;
    model: string;
    brand: string;
    desc: string;
    img: string;
    qtyType: string;
    tax: number = 0;
    unit: number = 1;

    price: number = 0;
    alt: string;
    qty: number = 0;
    disc: number = 0;
    isActive: boolean = true;
    hghLghtCart: boolean = false;

    constructor(product, category){
        this.productId = product.productId;
        this.mrp = product.mrp;
        this.category = product.category || category;
        this.model = product.model;
        this.brand = product.brand;
        this.desc = product.desc;
        this.img = product.img;
        this.qtyType = product.qtyType;
        this.tax = product.tax;
        this.unit = product.unit;

        this.alt = this.productId;
    }

}