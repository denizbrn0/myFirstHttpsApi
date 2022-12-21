import express from "express";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/", (req, res) => {
  const appid = "";
  const city = req.body.city;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.replace(/\s/g, "") +
    "&appid=" +
    appid +
    "&units=metric";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const dataJson = JSON.parse(data);
      res.send(dataJson);
    });
  });
});

app.listen(3000);
