export interface IC0025 {
  completed: boolean;
  extracurriculars?: ExtracurricularsEntity[] | null;
}
export interface ExtracurricularsEntity {
  url_image: string;
  from_date: string;
  to_date: string;
  title: string;
  description: string;
  award: string;
  in_progress: boolean;
  leadership: boolean;
}
export class ExtracurricularsEntity implements ExtracurricularsEntity {
}
