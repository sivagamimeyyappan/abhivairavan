import { Product } from "./Product";

export class ProductsData{
    products: Array<Product> = [];
    filterOptions: object = {};
    filterCriteria: object = {};
    count:number = 0;
}