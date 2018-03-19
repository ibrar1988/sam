export interface ICartItem {

  productId: string;
  productNote: string;
  productQty: number;

}

export class CartItem implements ICartItem {

  constructor(
    public productId: string,
    public productNote: string,
    public productQty: number

  ){}

}
