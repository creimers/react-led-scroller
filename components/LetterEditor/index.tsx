import * as React from "react";

import Column from "../Column";

const emptyColumn = new Array(16).fill(false);
const defaultColumns = 6;

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export default function LetterEditor() {
  const [columns, setColumns] = React.useState(defaultColumns);
  const [pattern, setPattern] = React.useState(
    [...new Array(columns)].map(() => [...emptyColumn])
  );

  React.useEffect(() => {
    setPattern([...new Array(columns)].map(() => [...emptyColumn]));
  }, [columns]);

  function updatePattern(columnIndex: number) {
    function toggleOn(rowIndex: number) {
      let prevPattern = [...pattern];
      const prevValue = prevPattern[columnIndex][rowIndex];
      prevPattern[columnIndex][rowIndex] = !prevValue;
      setPattern(prevPattern);
    }
    return toggleOn;
  }

  function toggleColumn(columnIndex: number) {
    const prevPattern = [...pattern];
    const theColumn = [...pattern[columnIndex]];
    const someOn = theColumn.some((r) => r);
    if (someOn) {
      prevPattern[columnIndex] = theColumn.map(() => false);
    } else {
      prevPattern[columnIndex] = theColumn.map(() => true);
    }
    setPattern(prevPattern);
  }
  function toggleRow(rowIndex: number) {
    let theRow = [];
    const prevPattern = [...pattern];
    for (const column of prevPattern) {
      theRow.push(column[rowIndex]);
    }
    const someOn = theRow.some((c) => c);
    for (const column of prevPattern) {
      if (someOn) {
        column[rowIndex] = false;
      } else {
        column[rowIndex] = true;
      }
    }
    setPattern(prevPattern);
  }

  function reset() {
    setPattern([...new Array(defaultColumns)].map(() => [...emptyColumn]));
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            <button onClick={reset}>reset</button>
            <input
              value={columns}
              type="number"
              min="1"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setColumns(Number(e.currentTarget.value));
              }}
            />
          </div>
          <div className="flex items-end space-x-1">
            <div className="space-y-1">
              {[...Array(16)].map((_, i) => (
                <div
                  key={`column-picker-${i}`}
                  className="rounded-full bg-red-500 w-3 h-3 cursor-pointer"
                  onClick={() => toggleRow(i)}
                ></div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex space-x-1 py-1">
                {[...Array(columns)].map((_, i) => (
                  <div
                    key={`column-picker-${i}`}
                    className="rounded-full bg-red-500 w-3 h-3 cursor-pointer"
                    onClick={() => toggleColumn(i)}
                  ></div>
                ))}
              </div>
              <div className="flex space-x-1 bg-black">
                {pattern.map((column, i) => (
                  <Column
                    pattern={column}
                    key={`column-${i}`}
                    toggleOn={updatePattern(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              copyTextToClipboard(JSON.stringify(pattern, null, 3))
            }
          >
            copy
          </button>
          <div className="bg-gray-200 font-mono p-4 text-sm">
            {JSON.stringify(pattern, null, 3)}
          </div>
        </div>
      </div>
    </div>
  );
}
