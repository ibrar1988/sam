import { ICoupon } from 'core/interfaces/Store/ICoupon';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';

export interface ICouponResponse {
    response: IStandardResponse;
    coupon: ICoupon;
}
