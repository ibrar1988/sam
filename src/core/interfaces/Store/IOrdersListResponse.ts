import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IOrder } from 'core/interfaces/Store/IOrder';

export interface IOrdersListResponse {

    response: IStandardResponse;
    orders: IOrder[];

}
