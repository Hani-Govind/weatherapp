import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `http://localhost:3001/weather?city=${city}`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Server error");
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App </h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Condition: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;