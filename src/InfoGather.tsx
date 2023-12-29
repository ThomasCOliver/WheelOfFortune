import React from 'react';
import './App.css';

interface InfoGatherProps {
  onSubmit: (cat: string, phrase: string) => void;
}

const InfoGather: React.FunctionComponent<React.PropsWithChildren<InfoGatherProps>> = ({onSubmit}) => {
  const [category, setCategory] = React.useState("");
  const [phrase, setPhrase] = React.useState("");

  function onInfoGatherSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(category, phrase);
  }

  return (
    <form onSubmit={onInfoGatherSubmit}>
      <h2>Category</h2>
      <input type="text" id="category" name="category" value={category} onChange={e => setCategory(e.target.value)}/>
      <h2>Phrase</h2>
      <input type="text" id="phrase" name="phrase" value={phrase} onChange={e => setPhrase(e.target.value)}/>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default InfoGather;
