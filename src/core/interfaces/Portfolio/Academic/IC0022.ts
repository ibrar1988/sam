export interface IC0022 {
  achievements_awards?: AchievementsAwardsEntity[] | null;
}
export interface AchievementsAwardsEntity {
  category: string;
  award_name: string;
  date: string;
  url_image: string;
  description: string;
}
