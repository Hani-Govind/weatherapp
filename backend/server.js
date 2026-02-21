require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get API key from .env
const API_KEY = process.env.API_KEY;

// Weather Route
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity
        });

    } catch (error) {
        res.status(400).json({ error: "City not found" });
    }
});

// Start Server
app.listen(3001, () => {
    console.log("Backend running on http://localhost:3001");
});