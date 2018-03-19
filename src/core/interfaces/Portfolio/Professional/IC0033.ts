export interface IC0033 {
  internships?: InternshipsEntity[] | null;
}
export interface InternshipsEntity {
  role: string;
  institution_Company: string;
  from_date: string;
  to_date: string;
  location: string;
  description: string;
  in_progress: boolean;
}
