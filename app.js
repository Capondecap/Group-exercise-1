const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

// Disable x-powered-by
app.disable("x-powered-by");

let reports = [];

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Dashboard ROUTE
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { reports });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/dashboard");
});