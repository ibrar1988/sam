import {IStandardResponse} from '../IStandardResponse';
import {ILogin} from './ILogin';
export interface ILoginResponse {
    response: IStandardResponse;
    login: ILogin;
}
