import { BehaviorSubject } from "rxjs";

export class PrimaryData{
    private brands: Array<string> = [];
    private models: Array<string> = [];
    private categories: Array<string> = [];

    private brandsSub = new BehaviorSubject<Array<string>>(this.brands);
    public observebrands = this.brandsSub.asObservable();

    private modelsSub = new BehaviorSubject<Array<string>>(this.models);
    public observemodels = this.modelsSub.asObservable();

    private categoriesSub = new BehaviorSubject<Array<string>>(this.categories);
    public observecategories = this.categoriesSub.asObservable();

    public setBrands(value: Array<string>) {
        this.brands = value;
        this.brandsSub.next(value);
    }
    public setModels(value: Array<string>) {
        this.models = value;
        this.modelsSub.next(value);
    }
    public setCategories(value: Array<string>) {
        this.categories = value;
        this.categoriesSub.next(value);
    }

    public getBrands() {
        return this.brands;
    }
    public getModels() {
        return this.models;
    }
    public getCategories() {
        return this.categories;
    }
}