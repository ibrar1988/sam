import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IOrderDetail } from 'core/interfaces/Store/IOrderDetail';

export interface IOrderDetailResponse {
    response: IStandardResponse;
    itemDetail: IOrderDetail;
}
