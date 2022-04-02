const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const PORT = process.env.PORT || 5000;




const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food ❤️️"];
const workItems = [];


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get("/", function (req, res) {

    /* My solution

     const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const d = new Date();
      let day = weekday[d.getDay()];
          res.render("list", {kindOfDay: day});
     */
    /* or another solution
var today = new Date();
var currentDay = today.getDay();
var day = "";

switch (currentDay) {
    case 0:
    day = "Sunday";
    break;
    case 1:
    day = "Monday";
    break;
    case 2:
    day = "Tuesday";
    break;
    case 3:
    day = "Wednesday";
    break;
    case 4:
    day = "Thursday";
    break;
    case 5:
    day = "Friday";
    break;
    case 6:
    day = "Saturday";
    break;
    default:
        console.log("Error: current day is equal to" + currentDay);
}
*/
    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", function (req, res) {

    const item = req.body.newItem;

    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.get("/about", function (req, res) {
    res.render("about");
})

