import React from 'react';
import WheelOfFortuneLetter from './WheelOfFortuneLetter';
import './WheelOfFortuneWall.css'
import vanna from './vanna.png'
import wheelOfFortuneImage from './wheelOfFortune.png'

interface WheelOfFortuneWallProps {
  category: string;
  phrase: string;
  guessedLetters: string[];
  showSolution: boolean;
}

// Wheel of Fortune wall is a 12/14/14/12 wall of TVs that are each somewhere around a 3:4 aspect ratio
const WheelOfFortuneWall: React.FunctionComponent<React.PropsWithChildren<WheelOfFortuneWallProps>> = ({category, phrase, guessedLetters, showSolution}) => {
  const NUM_ROWS = 4;
  const NUM_COLS = 14;

  const NUM_COLS_PER_LINE = [NUM_COLS - 2, NUM_COLS, NUM_COLS, NUM_COLS - 2];

  // Place the phrase within the wall
  // Rules:
  //  1. Prefer to split over fewer lines than more lines
  //  2. Center-align each line. If an odd number of letters, prefer aligning to the left.
  //  3. Each line cannot be longer than that line's allotment.
  //  4. Prefer the shortest possible long line.
  const wordsInPhrase = phrase.split(' ');

  const getLengthOnLine = (line: string[]) => {
    let length = -1;
    for (let word of line) {
      ++length;
      length += word.length;
    }
    return length;
  }

  const getPossibleWordCombinations = (existingLines: string[][], currentLineIndex: number, remainingWords: string[]): string[][][] => {

    const clone2DArray = (lines: string[][]) => {
      return lines.map((line: string[]) => [...line]);
    }

    if (remainingWords.length === 0) {
      return [existingLines];
    }
    let newRemainingWords = [...remainingWords];
    const wordToConsider = newRemainingWords.shift() as string;

    let results: string[][][] = [];
    if (getLengthOnLine(existingLines[currentLineIndex]) + 1 + wordToConsider.length <= NUM_COLS_PER_LINE[currentLineIndex]) {
      // Allowable to be on the same line, try that
      const newExistingLines = clone2DArray(existingLines);
      newExistingLines[currentLineIndex].push(wordToConsider);
      results = [...results, ...getPossibleWordCombinations(newExistingLines, currentLineIndex, newRemainingWords)];
    }
    if (currentLineIndex !== NUM_ROWS - 1) {
      // Allowable to be on the next line, try that
      ++currentLineIndex;
      results = [...results, ...getPossibleWordCombinations(existingLines, currentLineIndex, remainingWords)]
    }
    return results;
  }

  let possibleWordCombinations = getPossibleWordCombinations([[],[],[],[]], 0, wordsInPhrase);

  const centerLinesVertically = (wordCombination: string[][]) => {
    // Center the lines vertically
    // Get the first filled line index
    let startingLineIndex = 0
    for (; startingLineIndex < wordCombination.length; ++startingLineIndex) {
      if (wordCombination[startingLineIndex].length > 0) {
        break;
      }
    }
    let endingLineIndex = wordCombination.length - 1;
    for (; endingLineIndex >= 0; --endingLineIndex) {
      if (wordCombination[endingLineIndex].length > 0) {
        break;
      }
    }
    const emptyLinesAtBeginning = startingLineIndex;
    const emptyLinesAtEnd = (wordCombination.length - 1) - endingLineIndex;

    // Try to start on second line
    if (emptyLinesAtBeginning === 0 && emptyLinesAtEnd > 0) {
      wordCombination.unshift([]);
      wordCombination.pop();
    }
    if (emptyLinesAtBeginning > 1) {
      const numberOfLinesToRemoveFromStart = emptyLinesAtBeginning - 1;
      for (let i = 0; i < numberOfLinesToRemoveFromStart; ++i) {
        wordCombination.shift();
      }
    }

    return wordCombination;
  };

  // Center the words on their lines
  const centerLinesHoizontally = (wordCombination: string[][]) => {
    let startingIndex = Infinity;
    let lines = [];
    for (let line of wordCombination) {
      const lineLength = getLengthOnLine(line);
      // Find the starting index for the line
      let thisLineStartingIndex = Math.floor((NUM_COLS - lineLength) / 2);
      startingIndex = Math.min(startingIndex, thisLineStartingIndex)
    }

    for (let row = 0; row < wordCombination.length; ++row) {
      const line = wordCombination[row];
      let newLine: string[] = Array(NUM_COLS).fill(null);
      let index = null;
      if ((row === 0 || row === NUM_ROWS - 1) && startingIndex === 0) {
        index = 1;
      } else {
        index = startingIndex;
      }
      for (let word of line) {
        for (let letter of word) {
          newLine[index] = letter;
          ++index;
        }
        // Spacing between words
        ++index;
      }
      lines.push(newLine);
    }

    return lines;
  }

  const getBestWordCombination = (possibleWordCombinations: string[][][]): string[][] => {
    let bestWordCombinationScore = Infinity;
    let bestWordCombination = null;
    for (let wordCombination of possibleWordCombinations) {
      let score = 0;
      for (let row = 0; row < wordCombination.length; ++row) {
        for (let column = 0; column < wordCombination[row].length; ++column) {
          let possibleLetter = wordCombination[row][column];
          if (possibleLetter !== null) {
            // Valid letter, score the weight
            const distanceFromCenterVertically = Math.abs(row - ((NUM_ROWS - 1) / 2));
            const verticalScore = Math.pow(distanceFromCenterVertically * (NUM_COLS / NUM_ROWS), 2);
            const distanceFromCenterHorizontally = Math.abs(column - ((NUM_COLS - 1) / 2));
            const horizontalScore = distanceFromCenterHorizontally;
            score += (verticalScore + horizontalScore);
          }
        }
      }
      if (score < bestWordCombinationScore) {
        bestWordCombinationScore = score;
        bestWordCombination = wordCombination;
      }
    }
    if (getBestWordCombination === null) {
      throw new Error("Unexpected failure in getting the besting word combination.");
    }
    return bestWordCombination as string[][];
  };

  const chosenWordCombination = getBestWordCombination(possibleWordCombinations.map(centerLinesHoizontally));

  let wheelOfFortuneTable = [];
  for (let row = 0; row < NUM_ROWS; ++row) {
    let wheelOfFortuneRow = [];

    for (let col = 0; col < NUM_COLS; ++col) {
      const letter = chosenWordCombination[row][col];
      const isDummyLetter = (row === 0 || row === NUM_ROWS - 1) && (col === 0 || col === NUM_COLS - 1);
      wheelOfFortuneRow.push(
        <WheelOfFortuneLetter
          letter={letter}
          guessed={showSolution || guessedLetters.indexOf(letter) !== -1}
          isVisible={!isDummyLetter} />
      );
    }
    wheelOfFortuneTable.push(
      <div style={{
        whiteSpace: 'nowrap'
      }}>
        {wheelOfFortuneRow}
      </div>
    );
  }
  const wheelOfFortuneLetters = (
    <div>
      {wheelOfFortuneTable}
    </div>
  );
  return (
    <div>
      <div className="WheelOfFortuneWallOuter">
        <div className="WheelOfFortuneWallInner" style={{
          backgroundImage: `url(${wheelOfFortuneImage})`,
        }}>
          {wheelOfFortuneLetters}
        </div>
      </div>
      <span className="category_display" >{category.toUpperCase()}</span>
      <h3>{guessedLetters}</h3>
    </div>
  );
}

export default WheelOfFortuneWall;
