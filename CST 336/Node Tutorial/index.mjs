import express from 'express';

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

app.get('/', (req, res) => {
   res.render("home.ejs");
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetPic;

   if (planet === "Jupiter") {
      planetPic = "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter_OPAL_2024.png/330px-Jupiter_OPAL_2024.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail";
      res.render("planet.ejs", {name: "Jupiter", image: planetPic, fun_1: "Inspiration for Sailor Jupiter from Sailor Moon", fun_2: "Mass: 1.90 x 10^27 kg"});
   } else if (planet === "Mars") {
      planetPic = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original";
      res.render("planet.ejs", {name: "Mars", image: planetPic, fun_1: "Inspiration for Sailor Mars from Sailor Moon", fun_2: "Mass: 6.42 x 10^23 kg"});
   } else if (planet === "Mercury") {
      planetPic = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original";
      res.render("planet.ejs", {name: "Mercury", image: planetPic, fun_1: "Inspiration for Sailor Mercury from Sailor Moon", fun_2: "Mass: 3.30 x 10^23 kg"});
   } else if (planet === "Venus") {
      planetPic = "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/pia00271/PIA00271~large.jpg?w=1920&h=1920&fit=clip&crop=faces%2Cfocalpoint";
      res.render("planet.ejs", {name: "Venus", image: planetPic, fun_1: "Inspiration for Sailor Venus from Sailor Moon", fun_2: "Mass: 4.87 x 10^24 kg"});
   } else if (planet === "Earth") {
      planetPic = "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/The_Blue_Marble%2C_AS17-148-22727.jpg/1280px-The_Blue_Marble%2C_AS17-148-22727.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail";
      res.render("planet.ejs", {name: "Earth", image: planetPic, fun_1: "Only planet to not be a Sailor Guardian inspiration", fun_2: "Mass: 5.97 x 10^24 kg"});
   } else if (planet === "Saturn") {
      planetPic = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Saturn_%28planet%29_large.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original";
      res.render("planet.ejs", {name: "Saturn", image: planetPic, fun_1: "Inspiration for Sailor Saturn from Sailor Moon", fun_2: "Mass: 5.68 x 10^26 kg"});
   } else if (planet === "Uranus") {
      planetPic = "https://upload.wikimedia.org/wikipedia/commons/6/69/Uranus_Voyager2_color_calibrated.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original";
      res.render("planet.ejs", {name: "Uranus", image: planetPic, fun_1: "Inspiration for Sailor Uranus from Sailor Moon", fun_2: "Mass: 8.68 x 10^25 kg"});
   } else if (planet === "Neptune") {
      planetPic = "https://cdn.mos.cms.futurecdn.net/PezBzd9Fehsq9XWgWMauVV.jpg";
      res.render("planet.ejs", {name: "Neptune", image: planetPic, fun_1: "Inspiration for Sailor Neptune from Sailor Moon", fun_2: "Mass: 1.02 x 10^26 kg"});
   } else if (planet === "Pluto") {
      planetPic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkLgqR1n_aIGIMirDEB1gFqGpHFKJXxADzsGEWhC0Jw&s=10";
      res.render("planet.ejs", {name: "Pluto", image: planetPic, fun_1: "Inspiration for Sailor Pluto from Sailor Moon", fun_2: "Mass: 1.30 x 10^22 kg"});
   }
});

// Send to localhost:3000/catDetails page
// '/catDetails' indicates new page named catDetails from root
// Must create a path to each page with app.get(). Creating separate .html in public folder not required
// .json() sends objects

app.get('/catDetails', (req, res) => {
    let catInfo = {
        name: 'kitty',
        breed:'calico',
        age: '2'
    };

   res.json(catInfo);
});

// Indicates when localhost:3000 page is up on terminal
app.listen(3000, () => {
   console.log('server started');
});
