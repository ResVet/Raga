export type PackId = 'skeleton' | 'joints' | 'muscles' | 'attachments' | 'vessels' | 'nerves' | 'viscera' | 'lymphoid' | 'skin';
export type Side = 'l' | 'r' | null;
export type Lang = 'en' | 'id';
export type Vec3 = [number, number, number];

export interface StructureRec {
  id: string; // mesh/node id, e.g. "humerus-r"
  k: string; // concept key shared by both sides, e.g. "humerus"
  en: string;
  la: string | null; // TA2 Latin from Z-Anatomy
  side: Side;
  pack: PackId;
  mats: string[];
  path: string[];
  fn?: string;
  variant?: boolean;
}

export interface GroupRec {
  parent: string | null;
  la: string | null;
  k: string;
}

export interface LandmarkRec {
  k: string;
  en: string;
  la: string | null;
  on: string; // structure id
  side: Side;
  p: Vec3;
  n: Vec3;
  variant?: boolean;
}

export interface AttachmentRec {
  id: string;
  m: string; // muscle concept key
  kind: 'origin' | 'insertion';
  side: 'l' | 'r';
  bone: string | null;
}

export type Bi = { en?: string; id?: string };

export interface ContentEntry {
  key: string;
  kind: string;
  la: string;
  alt?: string[];
  en?: string;
  desc?: Bi;
  facts?: Record<string, unknown>;
  quiz?: Record<string, string[]>;
  model?: boolean;
  verify?: boolean;
  domain?: string;
}

/** A clinical vignette with one best answer. Written in content/cases, built into public/data/cases.json. */
export interface ClinicalCase {
  id: string;
  /** Which part of the course the case belongs to. */
  area: 'upper' | 'lower' | 'thorax' | 'heart';
  stem: Bi;
  /** The first option is the correct one; the app shuffles them. Latin terms are plain strings. */
  options: (string | Bi)[];
  explain: Bi;
  /** Concept keys shown on the model once the question is answered. */
  focus: string[];
}

export interface Definition {
  t: string;
  src: string | null;
}
