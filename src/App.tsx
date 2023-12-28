import React from 'react';
import './App.css';
import InfoGather from './InfoGather';
import WheelOfFortuneWall from './WheelOfFortuneWall';

function App() {
  const [category, setCategory] = React.useState("");
  const [phrase, setPhrase] = React.useState("");

  function onChange(cat: string, p: string) {
    setCategory(cat.toUpperCase());
    setPhrase(p.toUpperCase());
  }

  return (
    <div>
      <InfoGather onChange={onChange} />
      <WheelOfFortuneWall category={category} phrase={phrase} guessedLetters={[""]} />
    </div>
  );
}

export default App;
