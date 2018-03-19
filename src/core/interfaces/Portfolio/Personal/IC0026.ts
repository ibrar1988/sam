export interface IC0026 {
  completed: boolean;
  volunteering_service?: VolunteeringServiceEntity[] | null;
}
export interface VolunteeringServiceEntity {
  url_image: string;
  category_name: string;
  from_date: string;
  to_date: string;
  position: string;
  total_hours: string;
  description: string;
  award: string;
  in_progress: boolean;
  leadership: boolean;
}

export class VolunteeringServiceEntity implements VolunteeringServiceEntity {
}