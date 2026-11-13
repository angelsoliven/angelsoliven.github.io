import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));

// setting up database connection pool, replace values in red
// limits amount of user connections
const pool = mysql.createPool({
    host: "arfo8ynm6olw6vpn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ikhum7wssklvu8rh",
    password: "n4k67e9sgg7enafh",
    database: "jyl3reipitlgyaqq",
    connectionLimit: 10,
    waitForConnections: true
});

// routes
app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get("/dbTest", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
}); //dbTest

app.get("/quotesAboutLife", async(req, res) => {
  try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName 
            FROM quotes
            NATURAL JOIN authors
            WHERE quote LIKE '%life%' ORDER BY lastName`);
        //res.send(rows);
        res.render('results.ejs', {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.listen(3000, () => {
    console.log("Express server running")
})
