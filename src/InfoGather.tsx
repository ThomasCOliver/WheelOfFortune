import React from 'react';
import './App.css';

interface InfoGatherProps {
  onSubmit: (cat: string, phrase: string) => void;
}

const InfoGather: React.FunctionComponent<React.PropsWithChildren<InfoGatherProps>> = ({onSubmit}) => {
  const [category, setCategory] = React.useState("Around the House");
  const [phrase, setPhrase] = React.useState("");

  function onInfoGatherSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(category, phrase);
  }

  const listOfCategories = [
    "Around the House",
    "Before & After",
    "Best Seller",
    "Character",
    "Classic TV",
    "College Life",
    "Event",
    "Family",
    "Fun & Games",
    "Food & Drink",
    "Headline",
    "Husband & Wife",
    "In the Kitchen",
    "Landmark",
    "Living Thing",
    "Movie Quote",
    "TV Quote",
    "Occupation",
    "On the Map",
    "Person",
    "Phrase",
    "Place",
    "Proper Name",
    "Quotation",
    "Rhyme Time",
    "Same Letter",
    "Same Name",
    "Show Biz",
    "Song/Artist",
    "Song Lyrics",
    "Star & Role",
    "Thing",
    "Title",
    "Title/Author",
    "What Are You Doing?",
    "What Are You Wearing?"
  ];

  return (
    <form onSubmit={onInfoGatherSubmit}>
      <h2>Category</h2>
      <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
        {
          listOfCategories.map(catName => <option value={catName}>{catName}</option>)
        }
      </select>
      <h2>Phrase</h2>
      <input type="text" id="phrase" name="phrase" value={phrase} onChange={e => setPhrase(e.target.value)}/>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default InfoGather;
