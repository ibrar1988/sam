export interface IC0020 {
  languages?: LanguagesEntity[] | null;
}
export interface LanguagesEntity {
  language: string;
  properties?: PropertiesEntity[] | null;
}
export interface PropertiesEntity {
  language: string;
  proficiency: string;
}
