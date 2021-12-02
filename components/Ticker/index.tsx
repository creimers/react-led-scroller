import { useInterval } from "react-use";

import * as React from "react";
import Column from "components/Column";

const emptyColumn: boolean[] = new Array(16).fill(false);

import { ALPHABET_MAPPING } from "lib/alphabet";

const COLUMNS = 60;

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
      lettersAsColuns.push(emptyColumn);
    }
  }
  lettersAsColuns.push(emptyColumn);
  lettersAsColuns.push(emptyColumn);
  return lettersAsColuns;
}

export default function Ticker({
  text = "Test eins zwei.",
}: {
  text?: string;
}) {
  // const [sentence] = React.useState("Christoph Reimers.");
  const [tickerIndex, setTickerIndex] = React.useState(0);

  // const [sentenceAsColumns] = React.useState(() => sentenceToColumns(text));
  const sentenceAsColumns = React.useMemo(() => {
    return sentenceToColumns(text);
  }, [text]);

  useInterval(() => {
    setTickerIndex((i) => i + 1);
  }, 125);

  const sentenceLength = sentenceAsColumns.length;

  const currentTickerIndex = tickerIndex % (sentenceLength + COLUMNS);

  const before =
    currentTickerIndex < COLUMNS ? COLUMNS - currentTickerIndex : 0;
  let sentenceStart =
    currentTickerIndex > COLUMNS ? currentTickerIndex - COLUMNS : 0;
  //   const sentenceStart = currentTickerIndex;
  // if ()
  const sentenceEnd = currentTickerIndex;
  //   console.log({
  //     currentTickerIndex,
  //     sentenceStart,
  //     before,
  //     sentenceEnd,
  //     sentenceColums: sentenceLength,
  //   });
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
    </div>
  );
}
