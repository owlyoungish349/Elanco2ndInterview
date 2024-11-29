import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.webp"; // Import the logo
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const formattedData = response.data.map((country) => ({
          name: country.name.common,
          population: country.population,
          flag: country.flags.svg,
        }));
        setCountriesData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = countriesData.filter((country) =>
      country.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(matches.slice(0, 5));
    setSelectedSuggestionIndex(-1); // Reset suggestion index
  };

  const handleSuggestionClick = (country) => {
    setSearchQuery(country.name); // Set search query to the selected suggestion
    setSuggestions([]);
    handleSearch(country); // Use the selected country
  };

  const handleSearch = (selectedCountry = null) => {
    const countryToSearch = selectedCountry
      ? selectedCountry
      : countriesData.find(
          (country) => country.name.toLowerCase() === searchQuery.toLowerCase()
        );

    if (countryToSearch) {
      setResults((prevResults) => {
        if (prevResults.length >= 6) {
          alert("You can only view a maximum of 6 countries.");
          return prevResults;
        }
        if (prevResults.some((res) => res.name === countryToSearch.name)) {
          return prevResults;
        }
        return [...prevResults, countryToSearch];
      });
      setSearchQuery("");
      setSuggestions([]);
    } else {
      alert(`No data found for "${searchQuery}"`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const chartData = {
    labels: results.map((country) => country.name),
    datasets: [
      {
        label: "Population",
        data: results.map((country) => country.population),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      {/* Company Logo */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="company-logo" />
      </div>

      <h1 className="app-heading">Country Population Lookup</h1>
      <h3 className="app-subheading">Made by Alireza Kasiri</h3>

      <div className="search-container">
        <div style={{ position: "relative", width: "300px" }}>
          <input
            type="text"
            className="search-input"
            placeholder="Enter country name"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`suggestion-item ${
                    index === selectedSuggestionIndex ? "active-suggestion" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={results.length >= 6}
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="main-container">
          <div className="left-column">
            <div className="result-grid">
              {results.map((result, index) => (
                <div className="result-widget" key={index}>
                  <img
                    src={result.flag}
                    alt={`${result.name} Flag`}
                    className="country-flag"
                  />
                  <h2>{result.name}</h2>
                  <p>
                    <strong>Population:</strong>{" "}
                    {result.population.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="right-column">
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
