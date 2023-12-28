import React from 'react';
import './App.css';

interface InfoGatherProps {
  onChange: (cat: string, phrase: string) => void;
}

const InfoGather: React.FunctionComponent<React.PropsWithChildren<InfoGatherProps>> = ({onChange}) => {
  const [category, setCategory] = React.useState("");
  const [phrase, setPhrase] = React.useState("");

  function passInfo() {
    onChange(category, phrase);
  }

  return (
    <div className="InfoGathering">
      <h2>Category</h2>
      <input type="text" id="category" name="category" value={category} onChange={e => setCategory(e.target.value)}/>
      {category}
      <h2>Phrase</h2>
      <input type="text" id="phrase" name="phrase" value={phrase} onChange={e => setPhrase(e.target.value)}/>
      {phrase}
      <button onClick={passInfo} />
    </div>
  );
}

export default InfoGather;
