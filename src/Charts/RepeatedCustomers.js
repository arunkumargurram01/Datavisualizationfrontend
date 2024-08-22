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

const RepeatedCustomers = ({ repeatedCustomers }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (repeatedCustomers.daily && repeatedCustomers.daily.length > 0) {
            setChartData(prepareChartData(repeatedCustomers.daily, "Daily Repeated Customers"));
        }
    }, [repeatedCustomers]);

    const prepareChartData = (data, label) => {
        const labels = data.map(item => item._id);
        const sales = data.map(item => item.repeatCustomerCount);

        return {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: sales,
                    backgroundColor: "#6EACDA",
                    borderColor: "#6EACDA",
                    borderWidth: 1,
                }
            ]
        };
    }

    const handleButtonClick = (timePeriod) => {
        let data, label;
        switch (timePeriod) {
            case "D":
                data = repeatedCustomers.daily;
                label = "Daily Repeated Customers";
                break;
            case "M":
                data = repeatedCustomers.monthly;
                label = "Monthly Repeated Customers";
                break;
            case "Q":
                data = repeatedCustomers.quarterly;
                label = "Quarterly Repeated Customers";
                break;
            case "Y":
                data = repeatedCustomers.yearly;
                label = "Yearly Repeated Customers";
                break;
            default:
                data = repeatedCustomers.daily;
                label = "Daily Repeated Customers";
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
            <div className='h'>Repeated Customers Over Time</div>
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

export default RepeatedCustomers;
