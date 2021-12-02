import { a } from "./a";
import { B } from "./b";
import { d } from "./d";
import { E, e } from "./e";
import { h } from "./h";
import { i } from "./i";
import { n } from "./n";
import { o } from "./o";
import { R } from "./r";
import { s } from "./s";
import { t } from "./t";
import { u } from "./u";
import { x } from "./x";

import { colon } from "./punctuation";

const emptyColumn: boolean[] = new Array(16).fill(false);

export const ALPHABET_MAPPING: { [key: string]: boolean[][] } = {
  a,
  B,
  d,
  e,
  E,
  h,
  i,
  n,
  o,
  R,
  s,
  t,
  u,
  x,
  ":": colon,
  " ": [emptyColumn],
};
