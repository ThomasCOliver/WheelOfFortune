import WheelOfFortuneWall from './WheelOfFortuneWall';
import React from 'react';
import './GuessingGame.css'
import { click } from '@testing-library/user-event/dist/click';

interface GuessingGameProps {
  category: string;
  phrase: string;
}

const GuessingGame: React.FunctionComponent<React.PropsWithChildren<GuessingGameProps>> = ({category, phrase}) => {
  const [lettersToGuess, setLettersToGuess] = React.useState("");
  const [additionalGuessedLetters, setAdditionalGuessedLetters] = React.useState([] as string[]);
  const [hasGuessedAdditionalLetters, setHasGuessedAdditionalLetters] = React.useState(false);
  const [clickedShowSolution, setClickedShowSolution] = React.useState(false);
  const defaultGuessedLetters = ["R", "S", "T", "L", "N", "E"];

  function onGuessedLetterFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    addGuessedLetters();
  }

  function addGuessedLetters() {
    const lettersToGuessArray = lettersToGuess.split('');
    if (lettersToGuessArray.length > 4) {
      console.log("Failure case, can only have 4");
      return;
    }
    const isAlpha = function(ch: string) {
      return /^[A-Za-z]$/.test(ch);
    }
    if (lettersToGuessArray.filter(isAlpha).length !== 4) {
      console.log("Failure case, must all be letters");
      return;
    }
    const isVowel = function(ch: string) {
      // Wheel of Fortune does not treat Y as a vowel
      return ch === "A" || ch === "E" || ch === "I" || ch === "O" || ch === "U";
    }
    if (lettersToGuessArray.filter(isVowel).length !== 1) {
      console.log("Failure case, can only use 1 vowel");
      return;
    }
    for (const letterToGuess of lettersToGuessArray) {
      if (guessedLetters.indexOf(letterToGuess) !== -1) {
        console.log("Failure case, used an already guessed letter");
        return;
      }
    }
    const lettersToGuessSet = new Set(lettersToGuessArray);
    if (lettersToGuessSet.size !== 4) {
      console.log("Failure case, cannot reuse letters");
      return;
    }
    setAdditionalGuessedLetters([...lettersToGuessArray])
    setHasGuessedAdditionalLetters(true);
  }

  function onLettersToGuessChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLettersToGuess(e.target.value.toUpperCase());
  }

  function onShowSolutionClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setClickedShowSolution(true);
  }

  const guessedLetters: string[] = [...defaultGuessedLetters, ...additionalGuessedLetters];

  return (
    <div>
      <WheelOfFortuneWall category={category} phrase={phrase} guessedLetters={guessedLetters} showSolution={clickedShowSolution} />
      {
        !hasGuessedAdditionalLetters ?
          <form onSubmit={onGuessedLetterFormSubmit} style={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'column'
          }}>
            <input className="letterToGuessInput" value={lettersToGuess} onChange={onLettersToGuessChange} maxLength={4} />
          </form> :
          <span>{lettersToGuess}</span>
      }
      <button onClick={onShowSolutionClick}>Show Solution</button>
    </div>
  );
}

export default GuessingGame;
