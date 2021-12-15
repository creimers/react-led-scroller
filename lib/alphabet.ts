import { a, A, ä, Ä } from "./a";
import { b, B } from "./b";
import { c, C } from "./c";
import { d, D } from "./d";
import { E, e } from "./e";
import { f, F } from "./f";
import { g, G } from "./g";
import { h, H } from "./h";
import { i, I } from "./i";
import { j, J } from "./j";
import { k, K } from "./k";
import { l, L } from "./l";
import { m, M } from "./m";
import { n, N } from "./n";
import { o, O } from "./o";
import { p, P } from "./p";
import { q, Q } from "./q";
import { r, R } from "./r";
import { s, S, ß } from "./s";
import { t, T } from "./t";
import { u, U, ü, Ü } from "./u";
import { v, V } from "./v";
import { w, W } from "./w";
import { x, X } from "./x";
import { y, Y } from "./y";
import { z, Z } from "./z";

import {
  colon,
  dot,
  exclamation,
  question,
  comma,
  hyphen,
} from "./punctuation";

const emptyColumn: boolean[] = new Array(16).fill(false);

export const ALPHABET_MAPPING: { [key: string]: boolean[][] } = {
  a,
  A,
  ä,
  Ä,
  b,
  B,
  c,
  C,
  d,
  D,
  e,
  E,
  f,
  F,
  g,
  G,
  h,
  H,
  i,
  I,
  j,
  J,
  k,
  K,
  l,
  L,
  m,
  M,
  n,
  N,
  o,
  O,
  p,
  P,
  q,
  Q,
  r,
  R,
  s,
  S,
  t,
  T,
  u,
  U,
  ü,
  Ü,
  v,
  V,
  w,
  W,
  x,
  X,
  y,
  Y,
  z,
  Z,
  ß,
  ":": colon,
  ".": dot,
  ",": comma,
  "!": exclamation,
  "?": question,
  "-": hyphen,
  " ": [emptyColumn, emptyColumn],
};
