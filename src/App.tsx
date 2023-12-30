import React from 'react';
import './App.css';
import InfoGather from './InfoGather';
import GuessingGame from './GuessingGame'

function App() {
  const [category, setCategory] = React.useState("");
  const [phrase, setPhrase] = React.useState("");
  const [skipIntro, setSkipIntro] = React.useState(false);

  const [hasGatheredClueInfo, setHasGatheredClueInfo] = React.useState(false);

  function onInfoGatherSubmit(category_: string, phrase_: string, skipIntro_: boolean) {
    setCategory(category_.toUpperCase());
    setPhrase(phrase_.toUpperCase());
    setSkipIntro(skipIntro_);
    setHasGatheredClueInfo(true);
  }

  return (
    <div>
      {
        !hasGatheredClueInfo ?
          <InfoGather onSubmit={onInfoGatherSubmit} /> :
          <GuessingGame category={category} phrase={phrase} skipIntro={skipIntro}/>
      }
    </div>
  );
}

export default App;
