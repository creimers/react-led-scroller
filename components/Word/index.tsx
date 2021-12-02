import * as React from "react";
import Column from "components/Column";

const emptyColumn: boolean[] = new Array(16).fill(false);

import { ALPHABET_MAPPING } from "lib/alphabet";

export default function Word() {
  const [word, setWord] = React.useState("Endstation: Buxtehude");
  const letters = word
    .split("")
    .filter((letter) => ALPHABET_MAPPING[letter] !== undefined);

  // flat
  let separatedLetters: boolean[][] = [];
  separatedLetters.push(emptyColumn);
  separatedLetters.push(emptyColumn);

  for (let index = 0; index < letters.length; index++) {
    const letter = letters[index];
    const letterPattern = ALPHABET_MAPPING[letter];
    // separatedLetters.push(letterPattern);
    for (const column of letterPattern) {
      separatedLetters.push(column);
    }
    if (index < letters.length - 1) {
      separatedLetters.push(emptyColumn);
      separatedLetters.push(emptyColumn);
    }
  }
  separatedLetters.push(emptyColumn);
  separatedLetters.push(emptyColumn);
  return (
    <div>
      <div className="flex space-x-1 bg-black max-w-full overflow-x-scroll p-8">
        {separatedLetters.map((column, i) => (
          <Column pattern={column} key={`column-${i}`} />
        ))}
      </div>
    </div>
  );
}
