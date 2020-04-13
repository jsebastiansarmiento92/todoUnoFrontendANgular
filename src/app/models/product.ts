export class Product {
    id_product:number;
    name_product:string;
    price_product:number;
    info_product:string;
    stock:number;
    type_product:string;
    image_product:string;
    cost_product:number;

    toString():string{
        return this.id_product+this.name_product+this.price_product+this.info_product+this.stock+this.type_product+this.image_product+this.cost_product;
    }
}

