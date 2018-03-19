import {IStandardResponse} from '../IStandardResponse';
import {IState} from './IState';
export interface IStateResponse {

    response: IStandardResponse;
    states: Array<IState>;

}
