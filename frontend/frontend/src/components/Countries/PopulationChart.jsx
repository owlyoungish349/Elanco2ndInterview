import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ countries }) => {
    const data = {
        labels: countries.map((item) => item.country),
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default PopulationChart;
