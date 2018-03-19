import { ICartItem, CartItem } from 'core/interfaces/Store/ICartItem';

export interface IShoppingCart {

  cart: Array<ICartItem>;
  creation_timestamp: string;
  note: string;

}

export class ShoppingCart implements IShoppingCart {

  constructor(
    public cart: Array<CartItem>,
    public creation_timestamp: string,
    public note: string

  ) {

  }

}
