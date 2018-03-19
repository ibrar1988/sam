import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserRecommendedGoalExtended } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoalExtended';
export interface IUserRecommendedGoalResponse {
     response: IStandardResponse;
     user_goal_extended: IUserRecommendedGoalExtended;
}
