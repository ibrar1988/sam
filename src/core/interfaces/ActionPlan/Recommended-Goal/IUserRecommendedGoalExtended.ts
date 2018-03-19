import { IGoal } from '../IGoal';
import { IUserRecommendedGoal } from '../Recommended-Goal/IUserRecommendedGoal';
import { IMentorSimple } from 'core/interfaces/ActionPlan/IMentorSimple';
export interface IUserRecommendedGoalExtended {

  user_goal_recommended: IUserRecommendedGoal;
  gkey: string;
  name: string;
  description: string;
  img_url: string;
  tags: Array<string>;
  type: string;
  require_confirmation: boolean;
  mentor_list: Array<IMentorSimple>;
}


export class UserRecommendedGoalExtended implements IUserRecommendedGoalExtended {
  user_goal_recommended: IUserRecommendedGoal;
  gkey: string;
  name: string;
  description: string;
  img_url: string;
  tags: Array<string>;
  type: string;
  require_confirmation: boolean;
  mentor_list: Array<IMentorSimple>;
}