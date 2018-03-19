import { IBilling, Billing } from 'core/interfaces/Store/IBilling';
import { IShoppingCart, ShoppingCart } from 'core/interfaces/Store/IShoppingCart';

export interface ICompleteOrderStripeRequest {
  billing: IBilling;
  order_id: string;
  stripeToken: string;
  cart: IShoppingCart;
  promo_code: string;
}


export class CompleteOrderStripeRequest implements ICompleteOrderStripeRequest {

  constructor(
    public billing: Billing,
    public order_id: string,
    public stripeToken: string,
    public cart: ShoppingCart,
    public promo_code: string

  ) { }
}
