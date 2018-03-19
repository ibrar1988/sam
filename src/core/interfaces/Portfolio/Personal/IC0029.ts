export interface IC0029 {
  completed: boolean;
  achievements_awards?: AchievementsAwardsEntity[] | null;
}
export interface AchievementsAwardsEntity {
  category: string;
  date: string;
  url_image: string;
  description: string;
  reference: string;
}
export class AchievementsAwardsEntity implements AchievementsAwardsEntity{
}
