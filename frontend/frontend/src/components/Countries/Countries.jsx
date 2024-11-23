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
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/countries") // Fetch data from the backend
            .then((response) => {
                console.log("API Response:", response.data);
                setCountries(response.data.data || []); // Set countries data from API
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    const chartData = {
        labels: countries.map((item) => item.city || "Unknown"),
        datasets: [
            {
                label: "Population",
                data: countries.map((item) =>
                    item.populationCounts[0]?.value || 0
                ),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h2>City Population Data</h2>
            <Bar data={chartData} options={{ responsive: true }} />
            <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Country</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {item.country}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {item.city}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {item.populationCounts[0]?.value || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Countries;
