import React, { useState } from 'react'
import './App.css';
import axios from 'axios'
//import AddCharacters from './AddCharacters.js';

function App() { 

  const [characterName, setCharacterName] = useState("");
  const options = {
    method: "POST",
    headers: { 'content-type':'application/json'},
    data: JSON.stringify({characterName: characterName})
  }
  const submitCharacter = () => {
    console.log(characterName);
    axios.post('http://localhost:3001/api/insert', options).then(response => {
      console.log(response); 
      alert("SUCCESSFUL INSERT!");
    }).catch(error => {
      console.log(error);
    })
  };

  return (  
    <div className="App">
      {/* <AddCharacters /> */}
      
      <form>
                <label><h1>Add A Character</h1></label>
                <input type="text" name="characterName" onChange = {(e) => {
                  setCharacterName(e.target.value)
                }} />
                <br/>
                <br/>
                <button type="submit" onClick={ submitCharacter }>Submit</button>
   
            </form>
    </div>
  );
}

export default App;
