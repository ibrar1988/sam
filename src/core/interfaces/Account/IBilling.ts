export interface IBilling {
    first_name: String;
    last_name: String;
    address: String;
    // phone_number: String;
    country: String;
    state: String;
    city: String;
    zipcode: String;
    company: String;
}

export class Billing implements IBilling{

    first_name: String;
    last_name: String;
    address: String;
    // phone_number: String;
    country: String;
    state: String;
    city: String;
    zipcode: String;
    company: String;

}

