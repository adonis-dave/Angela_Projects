import { log } from "console";
import express from "express";
import https from "https";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "9ce984ece7bc8d5b9d3dd978f4a0465a#";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        // console.log(response.statusCode);

        // Requesting Weather Data in JSON format from the OPENWEATHER API
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);

            // Getting our specific data from the requested JSON data
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature at " + query + " is " + temp + " degree celsius.</h1>");
            res.write("<p>The Weather at " + query + " is " + desc + ".</p>");
            res.write("<img src=" + imageIcon + "></img>");
            res.send();
        })

    })
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});