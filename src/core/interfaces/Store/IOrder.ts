export interface IOrder {

    order_id: String;
    user_id: String;
    billing_note: String;
    billing_name: String;
    billing_lastname: String;
    billing_company: String;
    billing_address: String;
    billing_city: String;
    billing_country: String;
    billing_state: String;
    billing_zipcode: String;
   // shipping_information: String;
    amount: number;
    tax: number;
    creation_timestamp: String;
   // close_timestamp: String;
    status: String;
    coupon_code: string;
    coupon_discount_amount: number;
}
