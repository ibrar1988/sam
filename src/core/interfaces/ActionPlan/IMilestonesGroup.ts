import { IMilestone, Milestone } from 'core/interfaces/ActionPlan/IMilestone';

export interface IMilestonesGroup {

  name: string;
  description: string;
  status: string;
  qty: string;
  milestone_group: Array<IMilestone>;


}

export class MilestonesGroup {

  name: string;
  description: string;
  status: string;
  qty: string;
  milestone_group: Array<Milestone>;
}

