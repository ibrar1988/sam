import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { ICollegesSimple } from 'core/interfaces/Analytics/ICollegesSimple';

export interface ICollegesResponse {
    response: IStandardResponse;
    colleges: ICollegesSimple[];
}
