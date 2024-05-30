import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const apiKey = "45f68f1297918f9e16953111b62eda7e";

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
    console.log(weather);
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index.ejs", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});