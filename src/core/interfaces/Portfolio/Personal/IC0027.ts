export interface IC0027 {
  completed: boolean;
  hobbies_interests?: HobbiesInterestsEntity[] | null;
}
export interface HobbiesInterestsEntity {
  url_image: string;
  name: string;
  description: string;
  award: string;
}

export class HobbiesInterestsEntity implements HobbiesInterestsEntity {}
