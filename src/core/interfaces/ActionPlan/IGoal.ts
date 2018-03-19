export interface IGoal {

     gkey: string;
     name: string;
     milestones: string;
     description: string;
     img_url: string;
     tags: Array<string>;
     type: string;
     require_confirmation: boolean;

}