import * as React from "react";
import { useInterval } from "react-use";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";

import Column from "components/Column";

import { ALPHABET_MAPPING } from "lib/alphabet";

const emptyColumn: boolean[] = new Array(16).fill(false);

//@ts-ignore
const fullConfig = resolveConfig(tailwindConfig);

function sentenceToColumns(sentence: string) {
  const letters = sentence
    .split("")
    .filter((letter) => ALPHABET_MAPPING[letter] !== undefined);

  // flat
  let lettersAsColuns: boolean[][] = [];
  lettersAsColuns.push(emptyColumn);
  lettersAsColuns.push(emptyColumn);

  for (let index = 0; index < letters.length; index++) {
    const letter = letters[index];
    const letterPattern = ALPHABET_MAPPING[letter];
    for (const column of letterPattern) {
      lettersAsColuns.push(column);
    }
    if (index < letters.length - 1) {
      lettersAsColuns.push(emptyColumn);
    }
  }
  lettersAsColuns.push(emptyColumn);
  lettersAsColuns.push(emptyColumn);
  return lettersAsColuns;
}

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function getBreakpointOfWindowWidth() {
  const breakpoints = fullConfig.theme.screens as { [key: string]: string };
  let currentBreakpoint: Breakpoint = "xs";
  for (const breakpoint in breakpoints) {
    const breakpointWidth = breakpoints[breakpoint];
    const breakpointInPx = Number(breakpointWidth.replace(/px/, ""));
    if (window.innerWidth >= breakpointInPx + 1) {
      currentBreakpoint = breakpoint as Breakpoint;
    }
  }
  return currentBreakpoint;
}

const COLUMNS_BREAKPOINT_MAPPING = {
  xs: 35,
  sm: 50,
  md: 50,
  lg: 60,
  xl: 70,
  "2xl": 80,
};

export default function Ticker({
  text = "Was sagst du dazu?",
}: {
  text?: string;
}) {
  const [tickerIndex, setTickerIndex] = React.useState(0);
  const [columns, setColumns] = React.useState(0);

  React.useEffect(() => {
    const breakpoint = getBreakpointOfWindowWidth();
    const cols = COLUMNS_BREAKPOINT_MAPPING[breakpoint];
    console.log({ breakpoint, cols });
    setColumns(cols);
  }, []);

  const sentenceAsColumns = React.useMemo(() => {
    return sentenceToColumns(text);
  }, [text]);

  useInterval(() => {
    setTickerIndex((i) => i + 1);
  }, 100);

  const sentenceLength = sentenceAsColumns.length;

  const currentTickerIndex = tickerIndex % (sentenceLength + columns);

  const before =
    currentTickerIndex < columns ? columns - currentTickerIndex : 0;
  let sentenceStart =
    currentTickerIndex > columns ? currentTickerIndex - columns : 0;
  const sentenceEnd = currentTickerIndex;
  const after =
    currentTickerIndex > sentenceLength
      ? currentTickerIndex - sentenceLength
      : 0;

  const beforeColumns = [...Array(before)].map(() => [...emptyColumn]);
  const sentenceColums = sentenceAsColumns.slice(sentenceStart, sentenceEnd);
  const afterColumns = [...Array(after)].map(() => [...emptyColumn]);
  const finalColums = [...beforeColumns, ...sentenceColums, ...afterColumns];

  return (
    <div>
      <div className="flex space-x-1 bg-black max-w-full overflow-x-scroll p-8">
        {finalColums.map((column, i) => (
          <Column pattern={column} key={`column-${i}`} />
        ))}
      </div>
      {/* <div className="text-white">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">sm</div>
        <div className="hidden md:block lg:hidden">md</div>
        <div className="hidden lg:block xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div> */}
    </div>
  );
}
