const express = require('express');
const app = express(); //MANDATORY: MUST ALWAYS BE AFTER THE EXPRESSJS DECLARATION
const cors = require("cors");
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");

//NOTE: express can be declared many times. One for main (app), one for other things like admin, employees, clients, etc. with their own separate variables
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    pass: "",
    database: "basic_react_db"
});

app.use(cors());
app.use(bodyParser.json()) //THIS IS THE MIDDLEWARE

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/api/get', (req, res) => { //the res here is important to load to tthe frontend/DOM
 
    const sqlDisplay = "SELECT * FROM characters";
    db.query(sqlDisplay, (error, result) => { //the res here is the result of the query
        var objectified = result.map((mysqlObj, index) => { //THIS CODE IS USED TO TURN THE ROWDATAPACKET INTO ARRAY OBJECTS
            return Object.assign({}, mysqlObj);  //
        })
        var newResponse = Object.assign({}, objectified); //I DECLARED THE ARRAY OBJECT TO ANOTHER VARIABLE FOR CLEANER CALL
        res.send(newResponse);
      //res.send(newResponse);
    });
}); 

app.post('/api/insert', (req, res) => {    // SLASH MEANS DEFAULT FOR API ROUTING PAGE LOCATION. THIS IS LIKE HAVING API INTERACT
    //WITH ONLY THE PAGE SET TO THE SERVER. THIS IS KINDA GOOD FOR REUSING API PLUS PAGE HANDLING AS WELL BASED FOM MY OBSERVATION.
//    console.log(req);

//     //CONNECT TO DATABASE TEST
//     // const sqlInsert = "INSERT INTO characters (CharacterName) VALUES ('Finn the Human');";
//     // db.query(sqlInsert, (req, res) => {
//     //     res.send("HELLO!");
//     //     console.log(res);
//     // });

    const characterName = req.body.characterName; 
    const sqlInsert = "INSERT INTO characters (CharacterName) VALUES (?)"; //THIS IS HOW TO INJECT DATA TO SQL USING REACT EXPRESS
    db.query(sqlInsert, [characterName], (error, result) => {
        res.send(result);
    });

});

app.delete('/api/delete/:characterId', (req, res) => {   // :nameOfPassedParam => this is the format (like in Vue Routing, right?)

    const characterId = req.params.characterId; 
    const sqlDelete = "DELETE FROM characters WHERE CharacterId = ?"; //THIS IS HOW TO INJECT DATA TO SQL USING REACT EXPRESS
    db.query(sqlDelete, [characterId], (error, result) => {
        res.send(result);
    });

});

app.put('/api/update/:characterId', (req, res) => {   // :nameOfPassedParam => this is the format (like in Vue Routing, right?)
    
    const updateCharacterId = req.params.characterId; 
    const updateCharacterName = req.body.newCharacterName; 
    const sqlUpdate = "UPDATE characters SET CharacterName = ? WHERE CharacterId = ?"; //THIS IS HOW TO INJECT DATA TO SQL USING REACT EXPRESS
    db.query(sqlUpdate, [updateCharacterName, updateCharacterId], (error, result) => {
        //console.log(result);
        res.send(result);
    });

});


//NOTE USE taskkill /F /IM node.exe to reset the port back to 3000
//ADDED NOTE FOR API & PORT RELATIONSHIP: SO BASICALLY, WHATEVER NEW PORT WE ARE GOING TO RUN, IT AHS TO BE THE FETCH API'S PORT TOO
app.listen(3001, () => {
    console.log("running at port 3001") 
})