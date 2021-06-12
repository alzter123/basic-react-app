// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css';

function App() { 
 //NOTE FOR setSomethings: This is for having the method for any changes to the 'Something' variable's values.
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState("");

  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      }
    }
  

    fetch('http://127.0.0.1:3001/api/get', options) //THE URL FORMAT: SINCE 3000 IS DEFAULT, USE 3001 TO HANDLE API TO THE
    //ROUTER AS WELL AS USE THE 127.0.0.1 ACCORDING TO KUYA FOR BETTER COMMUNICATION TO THE SERVER
    .then(response => response.json()) //Converted ARRAY OBJECT TO JUST OBJECT
    .then(response2 => Object.values(response2)) //Convert OBJECT TO ONLY ARRAY so it can be mapped to the browser
    .then(response3 => setCharacterList(response3)) //DECLARE THE ARRAY TO THE CHARACTERLIST USING SETCHARACTERLIST
    .catch(err => console.log(err));
    
  }, []);

  const submitCharacter = (e) => {
    e.preventDefault(); //USE THIS TO AVOID REFRESH AFTER ACTION
    //BELOW IS KUYA'S CODE, THIS CAN STILL BE OPTIMIZED FOR BETTER RENDERING SUCH AS USING AXIOS NSTEAD OF FETCH, ETC.
   const options = {
      method: 'POST',
      body: JSON.stringify({characterName: characterName}),
      headers: {
        'Content-Type':'application/json',
      }
    }
  

    fetch('http://127.0.0.1:3001/api/insert', options) //THE URL FORMAT: SINCE 3000 IS DEFAULT, USE 3001 TO HANDLE API TO THE
    //ROUTER AS WELL AS USE THE 127.0.0.1 ACCORDING TO KUYA FOR BETTER COMMUNICATION TO THE SERVER
    .then(response => response.json())
    .then(result => setTimeout(function(){ 
      
      window.location.reload();
      alert("Character successfully added!");  
      console.log(result.data)
      
    }, 500)
    )
    .then(result2 => setCharacterList(result2.data))
    .catch(err => console.log(err));
  };

  const deleteHandler = (idVal) => {
    //newValue.preventDefault();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
      }
    }

    fetch(`http://127.0.0.1:3001/api/delete/${idVal}`, options) //THE URL FORMAT: SINCE 3000 IS DEFAULT, USE 3001 TO HANDLE API TO THE
    //ROUTER AS WELL AS USE THE 127.0.0.1 ACCORDING TO KUYA FOR BETTER COMMUNICATION TO THE SERVER
    .then(response => 
      setTimeout(function(){ 
        alert("Character successfully deleted!"); 
        window.location.reload(); 
      }, 3000))
      .catch(err => console.log(err));
  };

  const updateHandler = (idVal) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({newCharacterName: newCharacterName}),
      headers: {
        'Content-Type':'application/json',
      }
    }
    setNewCharacterName("");
    fetch(`http://127.0.0.1:3001/api/update/${idVal}`, options) //THE URL FORMAT: SINCE 3000 IS DEFAULT, USE 3001 TO HANDLE API TO THE
    //ROUTER AS WELL AS USE THE 127.0.0.1 ACCORDING TO KUYA FOR BETTER COMMUNICATION TO THE SERVER
    .then(response => 
      setTimeout(function(){ 
        alert("Character successfully updated!"); 
        window.location.reload(); 
      }, 500)
    ).catch(err => console.log(err));
  };


  //FOR BUTTON, USE TYPE: BUTTON INSTEAD OF SUBMIT
  return (  
    <div className="App">
    
                <label><h1>Add A Character</h1></label>
                <input type="text" name="characterName" onChange = {(e) => {
                  setCharacterName(e.target.value)
                }} />
                <br/>
                <br/>
                <button type="button" onClick={ submitCharacter }>Submit</button> 
                <br/>
                <br/>
                <h1>List of Characters</h1>
                { characterList.map((val, key) => { //the characterList should be an array here
                  return (
                    <div key = { key } className="characterList">
                        <h3>Character Name: { val.CharacterName } </h3>
                        <button onClick = {() => { deleteHandler(val.CharacterId)} }>DELETE</button>
                        <br/>
                        <input type="text" onChange = { (e) => { 
                          setNewCharacterName(e.target.value) 
                        }} placeholder = { val.CharacterName }></input> 
                        {/* Note: val.CharacterId is from the GET, and this newCharacterName is for the update */}
                        <button type="button" onClick = {() => { updateHandler(val.CharacterId, newCharacterName)}}>UPDATE</button>
                      </div>  
                      
                  );
                })}
                
    </div>
  );
}

export default App;
