import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IMentor } from 'core/interfaces/Mentors/IMentor';

export interface IMentorsListResponse {
    response: IStandardResponse;
    orders: IMentor[];
}
