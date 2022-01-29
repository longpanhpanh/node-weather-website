const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Long",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Long",
    title: "About me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Long",
    title: "Help",
  });
});
    
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "There must be a location",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    title: "404 Help Page",
    name: "Long",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404 Page",
    name: "Long",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000 port");
});
