import { IOrder } from 'core/interfaces/Store/IOrder';
import { IOrderDetail } from 'core/interfaces/Store/IOrderDetail';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';

export interface ICompleteOrderResponse {
    order: IOrder;
    detail: IOrderDetail[];
    response: ILoginResponse;
}
