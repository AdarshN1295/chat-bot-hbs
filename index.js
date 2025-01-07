const express = require("express");
const app = express();
const hbs = require('hbs')
const port = 5100;
const mysql = require('mysql2');

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/partials');

app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Blogging'
})

db.getConnection((err, connection)=>{
    if(err){
        console.error("something went wrong!");
    } else {
        console.log("Connection is created!")
        connection.release();
    }
})

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM `users`"
    db.query(sql, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(results);
      });
})

app.listen(port, ()=>{
    console.log(`server is listening at: localhost:${port}/ `);
})