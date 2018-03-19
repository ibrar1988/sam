
import {IStandardResponse} from '../IStandardResponse';
import {ICity} from './ICity';

export interface ICityResponse {
    response: IStandardResponse;
    cities: Array<ICity>;
}

