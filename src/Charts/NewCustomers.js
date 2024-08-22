import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const NewCustomersOverTime = ({ newCustomers }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (newCustomers.daily && newCustomers.daily.length > 0) {
            setChartData(prepareChartData(newCustomers.daily, "Daily New Coustomers"));
        }
    }, [newCustomers]);

    const prepareChartData = (data, label) => {
        const labels = data.map(item => item._id);
        const sales = data.map(item => item.totalCustomers);

        return {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: sales,
                    backgroundColor: "#88D66C",
                    borderColor: "#88D66C",
                    borderWidth: 1,
                }
            ]
        };
    }

    const handleButtonClick = (timePeriod) => {
        let data, label;
        switch (timePeriod) {
            case "D":
                data = newCustomers.daily;
                label = "Daily New Coustomers";
                break;
            case "M":
                data = newCustomers.monthly;
                label = "Monthly New Coustomers";
                break;
            case "Q":
                data = newCustomers.quarterly;
                label = "Quarterly New Coustomers";
                break;
            case "Y":
                data = newCustomers.yearly;
                label = "Yearly New Coustomers";
                break;
            default:
                data = newCustomers.daily;
                label = "Daily New Coustomers";
        }
        setChartData(prepareChartData(data, label));
    };

    const options = {
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { display: false } }
        }
    }

    return (
        <>
            <div className='sdiv'>
          <div className='hdiv'>
            <div className='h'>New Coustomers Over Time</div>
            <div className='buttons'>
                <div className='btn' onClick={() => handleButtonClick("D")}>D</div>
                <div className='btn' onClick={() => handleButtonClick("M")}>M</div>
                <div className='btn' onClick={() => handleButtonClick("Q")}>Q</div>
                <div className='btn' onClick={() => handleButtonClick("Y")}>Y</div>
            </div>
                </div>
            {chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
            </div>
        </>
    );
}

export default NewCustomersOverTime;
