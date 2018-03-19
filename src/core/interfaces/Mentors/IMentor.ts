export interface IMentor {
    relationship_id: string;
    user_id: string;
    mentor_id: string;
    status: string; //requested, approved, declined, deleted
    requested_id: string;
    requested_email: string;
    requested_date: string;
    approved_date: string;
    declined_date: string;
    deleted_date: string;
}


export class Mentor {

constructor(
  public relationship_id: string,
  public user_id: string,
  public mentor_id: string,
  public status: string, //requested, approved, declined, deleted
  public requested_id: string,
  public requested_email: string,
  public requested_date: string,
  public approved_date: string,
  public declined_date: string,
  public deleted_date: string

) {


}


}
