import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IBilling } from 'core/interfaces/Store/IBilling';

export interface INewOrderResponse {

    response: IStandardResponse;
    order_id: string;
    billing: IBilling;

}
