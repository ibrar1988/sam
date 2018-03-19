export interface IC0010 {
  psat_10?: Psat10Entity[] | null;
}
export interface Psat10Entity {
  evidence_based: string;
  reading: string;
  writing_language: string;
  math: string;
}
