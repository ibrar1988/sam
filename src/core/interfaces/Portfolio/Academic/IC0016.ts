export interface IC0016 {
  transcripts?: TranscriptsEntity[] | null;
}
export interface TranscriptsEntity {
  grade: string;
  properties?: PropertiesEntity[] | null;
}
export interface PropertiesEntity {
  course: string;
  score: string;
}
