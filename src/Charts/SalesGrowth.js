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

const SalesGrowthOverTime = ({ salesOverTime }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (salesOverTime.gdaily && salesOverTime.gdaily.length > 0) {
            setChartData(prepareChartData(salesOverTime.gdaily, "Daily Sales Growth"));
        }
    }, [salesOverTime]);

    const prepareChartData = (data, label) => {
        const labels = data.map(item => item._id);
        const sales = data.map(item => item.growthRate);

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
                data = salesOverTime.gdaily;
                label = "Daily Sales Growth";
                break;
            case "M":
                data = salesOverTime.gmonthly;
                label = "Monthly Sales Growth";
                break;
            case "Q":
                data = salesOverTime.gquarterly;
                label = "Quarterly Sales Growth";
                break;
            case "Y":
                data = salesOverTime.gyearly;
                label = "Yearly Sales Growth";
                break;
            default:
                data = salesOverTime.gdaily;
                label = "Daily Sales Growth";
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
            <div className='h'>Sales Growth Over Time</div>
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

export default SalesGrowthOverTime;
