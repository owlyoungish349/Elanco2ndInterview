import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Countries = () => {
    const [aggregatedData, setAggregatedData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/countries");
            .then((response) => {
                console.log("Raw API Data:", response.data);

                const rawData = response.data.data || [];

                // Aggregate populations by country
                const aggregation = rawData.reduce((acc, item) => {
                    const country = item?.country; // Safeguard against undefined
                    const population = item?.populationCounts?.[0]?.value || 0; // Default to 0 if missing

                    if (country) {
                        // Sum populations for each country
                        acc[country] = (acc[country] || 0) + population;
                    }

                    return acc;
                }, {});

                // Convert aggregated data into an array
                const formattedData = Object.entries(aggregation).map(
                    ([country, totalPopulation]) => ({
                        country,
                        totalPopulation,
                    })
                );

                setAggregatedData(formattedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter data based on search query
    const filteredData = aggregatedData.filter((item) =>
        item.country?.toLowerCase().includes(searchQuery) // Safeguard against undefined
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    const chartData = {
        labels: filteredData.map((item) => item.country),
        datasets: [
            {
                label: "Total Population",
                data: filteredData.map((item) => item.totalPopulation),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h2>Country Total Population</h2>
            <input
                type="text"
                placeholder="Search by country"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    fontSize: "16px",
                    width: "100%",
                }}
            />
            <Bar data={chartData} options={{ responsive: true }} />
            <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Country</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total Population</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {item.country}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {item.totalPopulation.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Countries;
