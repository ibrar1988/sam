export interface IBilling {

    billing_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    company: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;

}


export class Billing {

constructor(

  public billing_id: string,
  public user_id: string,
  public first_name: string,
  public last_name: string,
  public company: string,
  public  address: string,
  public city: string,
  public country: string,
  public state: string,
  public zipcode: string


){


}


}
