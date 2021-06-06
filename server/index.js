const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
const app = express();
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
app.use(express.json);

app.post('/api/insert', (req, res) => {    // SLASH MEANS DEFAULT FOR API ROUTING PAGE LOCATION. THIS IS LIKE HAVING API INTERACT
    //WITH ONLY THE PAGE SET TO THE SERVER. THIS IS KINDA GOOD FOR REUSING API PLUS PAGE HANDLING AS WELL BASED FOM MY OBSERVATION.
//    console.log(req);
   
//     //CONNECT TO DATABASE TEST
//     // const sqlInsert = "INSERT INTO characters (CharacterName) VALUES ('Finn the Human');";
//     // db.query(sqlInsert, (req, res) => {
//     //     res.send("HELLO!");
//     //     console.log(res);
//     // });
console.log(req.body);
    const characterName = req.body.characterName; 
    console.log("WORKS!");
    const sqlInsert = "INSERT INTO characters (CharacterName) VALUES (?)"; //THIS IS HOW TO INJECT DATA TO SQL USING REACT EXPRESS
    db.query(sqlInsert, [characterName], (err, res) => {
        res.send(res);
    });

});


//NOTE USE taskkill /F /IM node.exe to reset the port back to 3000
app.listen(3001, () => {
    console.log("running at port 3001")
})