import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserRecommendedGoalExtended } from 'core/interfaces/ActionPlan/Recommended-Goal/IUserRecommendedGoalExtended';
export interface IUserRecommendedGoalListResponse {

  response: IStandardResponse;
  user_goal_recommended_extended_list: Array<IUserRecommendedGoalExtended>;
}
