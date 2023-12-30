import React from 'react';
import './WheelOfFortuneLetter.css';
import unusedBackground from './unused_background.png'
import useSound from 'use-sound';
import letterDingSound from './sounds/letter_ding.mp3'
import useTimeout from './useTimeout';

interface WheelOfFortuneLetterProps {
  letter: string;
  guessed: boolean;
  isVisible: boolean;
}

// Wheel of Fortune wall is a 12/14/14/12 wall of TVs that are each somewhere around a 3:4 aspect ratio
const WheelOfFortuneLetter: React.FunctionComponent<React.PropsWithChildren<WheelOfFortuneLetterProps>> = ({letter, guessed, isVisible}) => {
  let [wasGuessed, setWasGuessed] = React.useState(false);
  let [isBlue, setIsBlue] = React.useState(false);
  let [playLetterDingSound, {stop: stopLetterDingSound}] = useSound(letterDingSound);
  useTimeout(() => {
    setIsBlue(false);
  }, isBlue ? 1000 : null);

  if (wasGuessed !== guessed) {
    setWasGuessed(true);
    setIsBlue(true);
    playLetterDingSound();
    console.log("Played the ding!");
  }

  function play() {
    playLetterDingSound();
  }

  if (!isVisible) {
    return (
      <div className="WheelOfFortuneMissingLetter">
      </div>
    );
  }
  return (
    <div className="WheelOfFortuneLetterOuter" onClick={() => playLetterDingSound()}>
      <div className={`WheelOfFortuneLetterInner ${isBlue ? "blue" : ""}`}>
        {
          letter !== null ?
            <span>{isBlue ? " " : (guessed ? letter : " ")}</span> :
            <img src={unusedBackground} alt="" />
        }
      </div>
    </div>
  );
}

export default WheelOfFortuneLetter;
