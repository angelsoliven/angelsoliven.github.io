const solarSystem = (await import('npm-solarsystem')).default;
import express from 'express';
import fetch from 'node-fetch';

// Skeleton for building an API

// Express is an API engine
const app = express();

// EJS is a way to dynamically build html pages
// and easily substitute date into them
app.set("view engine", "ejs");

// public folder
app.use(express.static("public"));

// Send to page localhost:3000
// '/' indicates root
// render() used with .ejs file to create pages; sends pages
// send() sends raw text

app.get('/', async (req, res) => {
   try {
      let imagesResponse = await fetch("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system");

      if (!imagesResponse.ok) {
         throw new Error("could not request random images");
      }

      let imagesData = await imagesResponse.json();
      for (let i = imagesData.hits.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [imagesData.hits[i], imagesData.hits[j]] = [imagesData.hits[j], imagesData.hits[i]];
      }

      let images = [];
      for (let i = 0; i < 4; i++) {
         images.push(imagesData.hits[i]);
      }

      res.render("home.ejs", { result: images, working: true });
   } catch (error) {
      res.render("home.ejs", { msg: error.message, working: false });
   }
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;

   if (planet === "Jupiter") {
      // render the planetInfo view with Jupiter info
      let jupiterData = solarSystem.getJupiter();
      res.render("planet.ejs", { planetData: jupiterData, name: "Jupiter", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Mars") {
      let marsData = solarSystem.getMars();
      res.render("planet.ejs", { planetData: marsData, name: "Mars", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Mercury") {
      let mercuryData = solarSystem.getMercury();
      res.render("planet.ejs", { planetData: mercuryData, name: "Mercury", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Venus") {
      let venusData = solarSystem.getVenus();
      res.render("planet.ejs", { planetData: venusData, name: "Venus", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Earth") {
      let earthData = solarSystem.getEarth();
      res.render("planet.ejs", { planetData: earthData, name: "Earth", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Saturn") {
      let saturnData = solarSystem.getSaturn();
      res.render("planet.ejs", { planetData: saturnData, name: "Saturn", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Uranus") {
      let uranusData = solarSystem.getUranus();
      res.render("planet.ejs", { planetData: uranusData, name: "Uranus", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Neptune") {
      let neptuneData = solarSystem.getNeptune();
      res.render("planet.ejs", { planetData: neptuneData, name: "Neptune", errorMessage: "oopsie, could not get data!" });
   } else if (planet === "Pluto") {
      let plutoData = solarSystem.getPluto();
      res.render("planet.ejs", { planetData: plutoData, name: "Pluto", errorMessage: "oopsie, could not get data!" });
   }
});

app.get('/asteroids', (req, res) => {
   let asteroidsData = solarSystem.getAsteroids();
   res.render('asteroids.ejs', { result: asteroidsData });
});

app.get('/comets', (req, res) => {
   let cometsData = solarSystem.getComets();
   res.render('comets.ejs', { result: cometsData });
});

app.get('/nasaPod', async (req, res) => {
   try {
      let current_date = new Date();
      let year = current_date.getFullYear().toString();
      let month = (current_date.getMonth() + 1).toString().padStart(2, '0');
      let day = current_date.getDate().toString().padStart(2, '0');
      let today = year + '-' + month + '-' + day;

      let nasaResponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=" + today);

      if (!nasaResponse.ok) {
         throw new Error("Error accessing API endpoint");
      }

      let nasaData = await nasaResponse.json();

      res.render('nasaPod.ejs', {result: nasaData});
   } catch (error) {
      res.render('nasaPod.ejs', {msg: error.message, working: false});
   }
});

// Send to localhost:3000/catDetails page
// '/catDetails' indicates new page named catDetails from root
// Must create a path to each page with app.get(). Creating separate .html in public folder not required
// .json() sends objects

app.get('/catDetails', (req, res) => {
   let catInfo = {
      name: 'kitty',
      breed: 'calico',
      age: '2'
   };

   res.json(catInfo);
});

// Indicates when localhost:3000 page is up on terminal
app.listen(3000, () => {
   console.log('server started');
});
