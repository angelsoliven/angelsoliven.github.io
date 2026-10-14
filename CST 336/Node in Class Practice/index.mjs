import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/results', async (req, res) => {
    let spongebobCharacters = [
        {
            name: "spongebob",
            img: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/spongebob_meme_64.png"
        },
        {
            name: "squidward",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtBg3RM-CznR6TWig_t7_TgbOPr7qDezplfYZMI4ebDGqLYLtKmVSgZNU&s=10"
        }
    ];

    let pokemon = [];

    try {
        let pokeResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");

        if (!pokeResponse.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let pokeData = await pokeResponse.json();
        console.log(pokeData);

        for (let mon of pokeData.results) {
            let monResponse = await fetch(mon.url);

            if (!monResponse.ok) {
                throw new Error("Error accessing API endpoint");
            }

            let monData = await monResponse.json();

            pokemon.push({ name: monData.name, img: monData.sprites.front_default });
            console.log(pokemon);
        }

        res.render("results.ejs", { results: spongebobCharacters, results2: pokemon });
    }
    catch (err) {
        if (err instanceof TypeError) {
            res.render("errorpage.ejs");
        } else {
            alert(err.message);
        }
    } //catch
});

app.listen(3000, () => {
    console.log('server started');
});
