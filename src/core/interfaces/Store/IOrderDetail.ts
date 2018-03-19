

export interface IOrderDetail {
    order_detail_id: string;
    order_id: string;
    product_code: string;
    product_description: string;
    product_qty: number;
    productValue: number;
    product_tax: number;
    product_type: string;
    subtotal: number;
}

export class OrderDetail implements IOrderDetail {
    order_detail_id: string;
    order_id: string;
    product_code: string;
    product_description: string;
    product_qty: number;
    productValue: number;
    product_tax: number;
    product_type: string;
    subtotal: number;
}
