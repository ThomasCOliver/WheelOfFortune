import React from 'react';
import './App.css';
import InfoGather from './InfoGather';
import GuessingGame from './GuessingGame'

function App() {
  const [category, setCategory] = React.useState("");
  const [phrase, setPhrase] = React.useState("");

  const [hasGatheredClueInfo, setHasGatheredClueInfo] = React.useState(false);

  function onInfoGatherSubmit(cat: string, p: string) {
    setCategory(cat.toUpperCase());
    setPhrase(p.toUpperCase());
    setHasGatheredClueInfo(true);
  }

  return (
    <div>
      {
        !hasGatheredClueInfo ?
          <InfoGather onSubmit={onInfoGatherSubmit} /> :
          <GuessingGame category={category} phrase={phrase} />
      }
    </div>
  );
}

export default App;
