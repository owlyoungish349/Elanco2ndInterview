import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/countries") // Fetching data from backend
            .then((response) => {
                const rawData = response.data.data || [];
                console.log("Raw API Data:", rawData);
    
                // Aggregate populations by country
                const aggregation = rawData.reduce((acc, item) => {
                    const { country, populationCounts } = item;
                    const population = parseFloat(
                        populationCounts?.[0]?.value || 0
                    ); // Ensure it's treated as a number
                    acc[country] = (acc[country] || 0) + population; // Sum populations
                    return acc;
                }, {});
    
                console.log("Aggregated Data:", aggregation);
    
                setCountriesData(aggregation); // Save aggregated data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            });
    }, []);
    

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setResult(null);
            return;
        }

        const population = countriesData[searchQuery];
        if (population) {
            setResult({
                country: searchQuery,
                population: population.toLocaleString(),
            });
        } else {
            setResult({ error: "Country not found" });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Country Population Lookup</h1>
            <input
                type="text"
                placeholder="Enter country name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "300px",
                    marginBottom: "20px",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    marginLeft: "10px",
                    cursor: "pointer",
                }}
            >
                Search
            </button>
            {result && (
    <div
        style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "inline-block",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            color: "black", // Set text color to black
        }}
    >
        {result.error ? (
            <h3 style={{ color: "red" }}>{result.error}</h3>
        ) : (
            <>
                <h2>{result.country}</h2>
                <p>
                    <strong>Total Population:</strong>{" "}
                    {result.population}
                </p>
            </>
        )}
    </div>
)}
        </div>
    );
};

export default App;
