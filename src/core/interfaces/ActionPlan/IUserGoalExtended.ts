import { IGoal } from './IGoal';
import { IUserGoal } from './IUserGoal';
import { IMentorSimple } from 'core/interfaces/ActionPlan/IMentorSimple';
export interface IUserGoalExtended {

  user_goals: IUserGoal;
  gkey: string;
  name: string;
  description: string;
  img_url: string;
  tags: Array<string>;
  type: string;
  require_confirmation: boolean;
  mentor_list: Array<IMentorSimple>;
}


export class UserGoalExtended implements IUserGoalExtended {

  user_goals: IUserGoal;
  gkey: string;
  name: string;
  description: string;
  img_url: string;
  tags: Array<string>;
  type: string;
  require_confirmation: boolean;
  mentor_list: Array<IMentorSimple>;


}
