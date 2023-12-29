import React from 'react';
import './WheelOfFortuneLetter.css';
import unusedBackground from './unused_background.png'

interface WheelOfFortuneLetterProps {
  letter: string;
  guessed: boolean;
  isVisible: boolean;
}

// Wheel of Fortune wall is a 12/14/14/12 wall of TVs that are each somewhere around a 3:4 aspect ratio
// const WheelOfFortuneWall: FunctionComponent<PropsWithChildren<WizardProps>> = ({children, title})
const WheelOfFortuneLetter: React.FunctionComponent<React.PropsWithChildren<WheelOfFortuneLetterProps>> = ({letter, guessed, isVisible}) => {
  if (!isVisible) {
    return (
      <div className="WheelOfFortuneMissingLetter">
      </div>
    );
  }
  return (
    <div className="WheelOfFortuneLetterOuter">
      <div className="WheelOfFortuneLetterInner">
        {
          letter !== null ?
            <span>{guessed ? letter : " "}</span> :
            <img src={unusedBackground} alt="" />
        }
      </div>
    </div>
  );
}

export default WheelOfFortuneLetter;
