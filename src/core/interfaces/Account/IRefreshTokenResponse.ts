import {IStandardResponse} from '../IStandardResponse';
export interface IRefreshTokenResponse {

    response: IStandardResponse;
    sessionToken: string;

}
