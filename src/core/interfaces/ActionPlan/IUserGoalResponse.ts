import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserGoalExtended } from 'core/interfaces/ActionPlan/IUserGoalExtended';
export interface IUserGoalResponse {
     response: IStandardResponse;
     user_goal_extended: IUserGoalExtended;
}
