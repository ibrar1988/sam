import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserGoalExtended } from 'core/interfaces/ActionPlan/IUserGoalExtended';
export interface IUserGoalListResponse {

  response: IStandardResponse;
  user_goal_extended_list: Array<IUserGoalExtended>;

}
