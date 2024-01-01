import WheelOfFortuneWall from './WheelOfFortuneWall';
import React from 'react';
import './GuessingGame.css'
import useSound from 'use-sound';
import rstlneSound from "./sounds/rstlne.mp3";
import countdownSound from "./sounds/countdown.mp3";
import additionalLettersSound from "./sounds/additional_letters.mp3";
import successSound from "./sounds/success_music.mp3";
import useTimeout from './useTimeout';
import launchVideo from './videos/wof_season_32_starting_theme.mp4'

interface GuessingGameProps {
  category: string;
  phrase: string;
  skipIntro: boolean;
}

enum PhaseOfGame {
  LaunchVideo,
  Pregame,
  RSTLNEGiving,
  WaitingForAdditionalLetters,
  FinalGuess,
  Finished
}

const GuessingGame: React.FunctionComponent<React.PropsWithChildren<GuessingGameProps>> = ({category, phrase, skipIntro}) => {
  const [lettersToGuess, setLettersToGuess] = React.useState("");
  const [hasGuessedAdditionalLetters, setHasGuessedAdditionalLetters] = React.useState(false);
  const [clickedShowSolution, setClickedShowSolution] = React.useState(false);
  const [defaultGuessedLetters, setDefaultGuessedLetters] = React.useState([] as string[]);
  const [additionalGuessedLetters, setAdditionalGuessedLetters] = React.useState([] as string[]);
  const [gamePhase, setGamePhase] = React.useState(!skipIntro ? PhaseOfGame.LaunchVideo : PhaseOfGame.Pregame);
  const [rstlneDelayTiming, setRstlneDelayTiming] = React.useState(!skipIntro ? null : 1000);
  const [playRstlneSound, {stop: stopRstlneSound}] = useSound(rstlneSound, {
    loop: true
  });
  const [playAdditionalLettersSound, {stop: stopAdditionalLettersSound}] = useSound(additionalLettersSound, {
    loop: true
  });
  const [playCountdownSound, {stop: stopCountdownSound}] = useSound(countdownSound);
  const [playSuccessSound] = useSound(successSound);

  useTimeout(() => {
    setDefaultGuessedLetters(["R", "S", "T", "L", "N", "E"]);
    setGamePhase(PhaseOfGame.RSTLNEGiving);
    playRstlneSound();
  }, rstlneDelayTiming);

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
      if (defaultGuessedLetters.indexOf(letterToGuess) !== -1) {
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
    stopRstlneSound();
  }

  function onLettersToGuessChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLettersToGuess(e.target.value.toUpperCase());
  }

  function onShowSolutionClick(success: boolean) {
    setClickedShowSolution(true);
    setGamePhase(PhaseOfGame.Finished);
    stopRstlneSound();
    stopCountdownSound();
    stopAdditionalLettersSound();
    if (success) {
      playSuccessSound();
    }
  }

  function onLettersFilled() {
    if (gamePhase === PhaseOfGame.RSTLNEGiving) {
      stopRstlneSound();
      setGamePhase(PhaseOfGame.WaitingForAdditionalLetters);
      playAdditionalLettersSound();
    } else if (gamePhase === PhaseOfGame.WaitingForAdditionalLetters) {
      setGamePhase(PhaseOfGame.FinalGuess);
      stopAdditionalLettersSound();
      playCountdownSound();
    }
  }

  const [countdownToStartingGame, setCountdownToStartingGame] = React.useState(null as null | number);
  useTimeout(() => {
    setGamePhase(PhaseOfGame.Pregame);
    setRstlneDelayTiming(1000);
  }, countdownToStartingGame);
  if (gamePhase === PhaseOfGame.LaunchVideo) {
    return (
      <video
        className='FullScreenVideo'
        src={launchVideo}
        onClick={(e) => (e.target as HTMLVideoElement).play()}
        onEnded={(_) => setCountdownToStartingGame(1000)} />
    )
  }

  return (
    <div className="GuessingGame">
      <WheelOfFortuneWall category={category} phrase={phrase} defaultGuessedLetters={defaultGuessedLetters} additionalGuessedLetters={additionalGuessedLetters} showSolution={clickedShowSolution} onLettersFilled={onLettersFilled} />
      <div className="GuessingGameUI UIElement">
        {
          !hasGuessedAdditionalLetters ?
            <form onSubmit={onGuessedLetterFormSubmit} style={{
              display: 'flex',
              alignItems: 'center',
              flexFlow: 'column'
            }}>
              <input className="letterToGuessInput" value={lettersToGuess} onChange={onLettersToGuessChange} maxLength={4} disabled={gamePhase <= PhaseOfGame.RSTLNEGiving || hasGuessedAdditionalLetters}/>
            </form> :
            <div>
              <button onClick={(e) => onShowSolutionClick(true)}>Show Solution (good)</button>
              <button onClick={(e) => onShowSolutionClick(false)}>Show Solution (bad)</button>
            </div>
        }
      </div>
    </div>
  );
}

export default GuessingGame;
