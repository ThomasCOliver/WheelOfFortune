import React from 'react';
import './WheelOfFortuneLetter.css';
import unusedBackground from './unused_background.png'

interface WheelOfFortuneLetterProps {
  visible: boolean;
  letter: string;
  guessed: boolean;
}

// Wheel of Fortune wall is a 12/14/14/12 wall of TVs that are each somewhere around a 3:4 aspect ratio
// const WheelOfFortuneWall: FunctionComponent<PropsWithChildren<WizardProps>> = ({children, title})
const WheelOfFortuneLetter: React.FunctionComponent<React.PropsWithChildren<WheelOfFortuneLetterProps>> = ({visible, letter, guessed}) => {
  return (
    <div className="WheelOfFortuneLetterOuter">
      <div className="WheelOfFortuneLetterInner">
        {
          visible ?
            <span>{guessed ? letter : " "}</span> :
            <img src={unusedBackground} alt="" />
        }
      </div>
    </div>
  );
}

export default WheelOfFortuneLetter;
