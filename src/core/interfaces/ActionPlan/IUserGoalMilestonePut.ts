
export interface IUserGoalMilestonePut {
    gkey: string;
    milestone: string;
    position: string;
}

export class UserGoalMilestonePut implements IUserGoalMilestonePut {
    gkey: string;
    milestone: string;
    position: string;
}
