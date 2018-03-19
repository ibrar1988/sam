export interface IMilestone {

  ref_code: string;
  img_url: string;
  name: string;
  description: string;
  status: string;
  req_prev: string;
  started_date: string;
  completed_date: string;

}

export class Milestone implements IMilestone {

  constructor() { }

  ref_code: string;
  img_url: string;
  name: string;
  description: string;
  status: string;
  req_prev: string;
  started_date: string;
  completed_date: string;


}

