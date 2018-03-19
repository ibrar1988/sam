import {ICountry} from './ICountry';
import {IStandardResponse} from '../IStandardResponse';

export interface ICountryResponse {
    response: IStandardResponse;
    countries: Array<ICountry>;

}
