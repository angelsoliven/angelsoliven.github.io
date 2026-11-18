import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "d13xat1hwxt21t45.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "lru868rp8ryaeke3",
    password: "mf9p2q7r3opq7lwg",
    database: "vnujnm2vqpohwi0e",
    connectionLimit: 10,
    waitForConnections: true
});



//routes
app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {

})

app.get('/newUser', (req, res) => {
    res.render('newUser.ejs');
})

app.post('/createUser', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let createUserSql = `INSERT INTO admin (username, password) 
               VALUES (?, ?)`;

    let hashedPassword = await bcrypt.hash(password, 10);
    let params = [username, hashedPassword];

    const [rows] = await pool.query(createUserSql, params);

    res.redirect('/');

});

app.get('/quotesList', async (req, res) => {
    let query = 'SELECT * FROM quotes';
    const [rows] = await pool.query(query);
    console.log(rows);
    
    res.render('quotes.ejs', {quotes: rows});
})

app.get("/dbTest", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
});