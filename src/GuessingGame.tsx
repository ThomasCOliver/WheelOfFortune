import WheelOfFortuneWall from './WheelOfFortuneWall';
import React from 'react';
import './GuessingGame.css'

interface GuessingGameProps {
  category: string;
  phrase: string;
}

const GuessingGame: React.FunctionComponent<React.PropsWithChildren<GuessingGameProps>> = ({category, phrase}) => {
  const [lettersToGuess, setLettersToGuess] = React.useState("");
  const [additionalGuessedLetters, setAdditionalGuessedLetters] = React.useState([] as string[]);
  const [hasGuessedAdditionalLetters, setHasGuessedAdditionalLetters] = React.useState(false);
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
    if (lettersToGuessArray.filter(isAlpha).length !== 4) {
      console.log("Failure case, must all be letters");
      return;
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

  const isAlpha = function(ch: string) {
    return /^[A-Za-z]$/.test(ch);
  }
  const isVowel = function(ch: string) {
    // Wheel of Fortune does not treat Y as a vowel
    return ch === "A" || ch === "E" || ch === "I" || ch === "O" || ch === "U";
  }
  function onLettersToGuessChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLettersToGuess(e.target.value.toUpperCase());
  }

  const guessedLetters: string[]= [...defaultGuessedLetters, ...additionalGuessedLetters];

  return (
    <div>
      <WheelOfFortuneWall category={category} phrase={phrase} guessedLetters={guessedLetters} />
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
    </div>
  );
}

export default GuessingGame;
