import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({ extended: true }));

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
    res.render('home.ejs');
});

//This function looks up a single quote by ID
async function getQuoteById(quoteId) {
    console.log(quoteId);
    let singleQuoteQuery = `SELECT * FROM quotes WHERE quoteId = ?`;
    let params = [quoteId];
    const [rows] = await pool.query(singleQuoteQuery, params);
    console.log(rows);

    if (rows.length < 1) {
        return null;
    } else {
        return rows[0];
    }
}

async function getAuthorById(authorId) {
    console.log(authorId);
    let singleQuoteQuery = `SELECT * FROM authors WHERE authorId = ?`;
    let params = [authorId];
    const [rows] = await pool.query(singleQuoteQuery, params);
    console.log(rows);

    if (rows.length < 1) {
        return null;
    } else {
        return rows[0];
    }
}

//This function gets all the data we need for dropdown lists
async function getQuoteFormData() {
    let getAuthorsQuery = 'SELECT * FROM authors;';
    const [authorRows] = await pool.query(getAuthorsQuery);

    let getCategoryQuery = 'SELECT DISTINCT category FROM quotes;';
    const [categoryRows] = await pool.query(getCategoryQuery);

    let formErrors = {}; // can be populated with errors for each field

    return { authors: authorRows, categories: categoryRows, formErrors: formErrors };
}

// renders an empty new quote form
app.get('/newQuote', async (req, res) => {
    //this runs any queries to populate drop-downlists
    let formData = await getQuoteFormData();
    res.render('newQuote.ejs', { formData, formErrors: {} });
});

app.get('/newAuthor', (req, res) => {
    res.render('newAuthor.ejs', { formErrors: {} });
});

// submits the users input to be entered into the db
app.post('/insertQuote', async (req, res) => {
    let quote = req.body.quote;
    let authorId = req.body.authorId;
    let category = req.body.category;
    let likes = req.body.likes;

    let hasErrors = false;
    let errors = [];

    if (quote === '') {
        hasErrors = true;
        errors.push("Quote cannot be empty");
    } // you can add other checks after this 

    if (likes < 0) {
        hasErrors = true;
        errors.push("Likes cannot be negative");
    }

    if (hasErrors) {
        let formData = await getQuoteFormData();
        //attach errors to be returned with the form
        res.render('newQuote.ejs', { formData, formErrors: errors });
    } else {
        let insertQuery =
            `INSERT INTO quotes (quote, authorId, category, likes) 
        VALUES (?, ?, ?, ?);`;
        let params = [quote, authorId, category, likes];
        const [quoteInsert] = await pool.query(insertQuery, params);

        //res.render('newQuote.ejs');
        res.redirect('/quoteList');
    }
});

app.post('/insertAuthor', async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dob = req.body.dob.toString();
    let dod = req.body.dod.toString();
    let gender = req.body.gender;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.portrait;
    let bio = req.body.bio;
    let errors = [];
    let hasErrors = false;

    dob = new Date(dob);
    dod = new Date(dod);

    if (firstName === "") {
        hasErrors = true;
        errors.push("First name cannot be empty");
    }

    if (lastName === "") {
        hasErrors = true;
        errors.push("Last name cannot be empty");
    }

    if (dod.getTime() < dob.getTime()) {
        hasErrors = true;
        errors.push("DOD cannot be before DOB");
    }

    dob = dob.toString();
    dod = dod.toString();

    if (hasErrors) {
        res.render('newAuthor.ejs', { formErrors: errors });
    } else {
        let params = [firstName, lastName, dob, dod, gender, profession, country, portrait, bio];
        let insertQuery =
            `INSERT INTO authors (firstName, lastName, dob, dod, gender, profession, country, portrait, biography)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const [rows] = await pool.query(insertQuery, params);
        res.redirect('/authorList');
    }
});

// renders the edit quote form
app.get('/editQuote', async (req, res) => {

    let quoteId = req.query.quoteId;
    let quoteObject = await getQuoteById(quoteId);

    if (quoteObject == null) {
        res.redirect('/quoteList');
    } else {
        let formData = await getQuoteFormData();
        let formObject = quoteObject; // the first record should be the quote we're editing

        //breaking this down:
        //formData is the data for the dropdown lists
        //form object is the "starter" information for the quote we're editing so
        //      it can get plugged into the form
        //formErrors is empty  
        res.render('editQuote.ejs', { formData, formObject, formErrors: {} });
    }
});

app.get('/editAuthor', async (req, res) => {
    let authorId = req.query.authorId;
    let authorObject = await getAuthorById(authorId);

    if (authorObject == null) {
        res.redirect('/authorList');
    } else {
        let formObject = authorObject;
        res.render('editAuthor.ejs', { formObject, formErrors: {} });
    }
});

app.get('/quoteList', async (req, res) => {
    let quotesQuery = `SELECT * FROM quotes`;
    const [rows] = await pool.query(quotesQuery);

    res.render('quoteList.ejs', { quotes: rows });
});

app.get('/authorList', async (req, res) => {
    let authorsQuery = `SELECT * FROM authors`;
    const [rows] = await pool.query(authorsQuery);

    res.render('authorList.ejs', { authors: rows });
});

app.post('/updateQuote', async (req, res) => {
    let quote = req.body.quote;
    let authorId = req.body.authorId;
    let category = req.body.category;
    let likes = req.body.likes;
    let quoteId = req.body.quoteId;

    let errors = [];
    let hasErrors = false;
    if (quote === "") {
        errors.push("Quote cannot be empty");
        hasErrors = true;
    }

    if (likes < 0) {
        errors.push("Likes cannot be negative");
        hasErrors = true;
    }

    if (hasErrors) {
        //when we re-render the page with errors, we need to redownload the quote data
        let quoteObject = await getQuoteById(quoteId);
        //as well as the data for the dropdown lists
        let quoteFormData = await getQuoteFormData();
        res.render('editQuote.ejs', { formObject: quoteObject, formData: quoteFormData, formErrors: errors });
    } else {
        let updateQuery =
            `UPDATE quotes SET
            quote = ?,
            authorId = ?,
            category = ?,
            likes = ?
            WHERE quoteId = ?;`;

        let params = [quote, authorId, category, likes, quoteId];
        const [rows] = await pool.query(updateQuery, params);
        res.redirect('/quoteList');
    }
});

app.post('/updateAuthor', async (req, res) => {
    let first = req.body.authorFirst;
    let last = req.body.authorLast;
    let dod = req.body.dod.toString();
    let dob = req.body.dob.toString();
    let gender = req.body.gender;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.portrait;
    let bio = req.body.bio;
    let authorId = req.body.authorId;
    let errors = [];
    let hasErrors = false;

    dob = new Date(dob);
    dod = new Date(dod);

    if (first === "") {
        hasErrors = true;
        errors.push("First name cannot be empty");
    }

    if (last === "") {
        hasErrors = true;
        errors.push("Last name cannot be empty");
    }

    if (dod.getTime() < dob.getTime()) {
        hasErrors = true;
        errors.push("DOD cannot be before DOB");
    }

    dob = dob.toString();
    dod = dod.toString();

    if (hasErrors) {
        let authorObject = getAuthorById(authorId);
        res.render('editAuthor.ejs', {formObject: authorObject, formErrors: errors});
    } else {
        let updateQuery =
            `UPDATE authors SET
            firstName = ?,
            lastName = ?,
            dod = ?,
            dob = ?,
            gender = ?,
            profession = ?,
            country = ?,
            portrait = ?,
            biography = ?
            WHERE authorId = ?;`;

        let params = [first, last, dod, dob, gender, profession, country, portrait, bio, authorId];
        const [rows] = await pool.query(updateQuery, params);
        res.redirect('/authorList');
    }
});

app.get("/dbTest", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, () => {
    console.log("Express server running")
})