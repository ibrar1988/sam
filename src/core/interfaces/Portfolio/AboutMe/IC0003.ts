export interface IC0003 {
  completed:boolean;
  comment?: CommentEntity[] | null;
}
export interface CommentEntity {
  name: string;
  date_of_creation: string;
  role: string;
  description: string;
  url_profile_image: string;
}
export class CommentEntity implements CommentEntity{
}
