import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IBilling } from 'core/interfaces/Account/IBilling';

export interface IBillingInfoResponse {
    response: IStandardResponse;
    billing: IBilling;

}
