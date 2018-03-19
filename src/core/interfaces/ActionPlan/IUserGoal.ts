export interface IUserGoal {

    user_goals_id: string;
    user_id: string;
    gkey: string;
    milestones: string;
    goal_code: string;
    milestones_qty: number;
    completed_milestones_qty: number;
    confirmed: boolean;
    goal_confirmed_by: string;
    goal_confirmed_date: Date;
    status: string;
    startdate: Date;
    completed_date: Date;
    last_action: string;
    last_update_date: Date;
    mentors: Array<string>;
    require_confirmation: boolean;
}

export class UserGoal implements IUserGoal {

    user_goals_id: string;
    user_id: string;
    gkey: string;
    milestones: string;
    goal_code: string;
    milestones_qty: number;
    completed_milestones_qty: number;
    confirmed: boolean;
    goal_confirmed_by: string;
    goal_confirmed_date: Date;
    status: string;
    startdate: Date;
    completed_date: Date;
    last_action: string;
    last_update_date: Date;
    mentors: Array<string>;
    require_confirmation: boolean;

}
