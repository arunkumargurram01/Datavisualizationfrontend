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

const CustomerCohorts = ({ customersCohorts }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (customersCohorts && customersCohorts.length > 0) {
            setChartData(prepareChartData(customersCohorts));
        }
    }, [customersCohorts]);


    useEffect(() => {
        console.log(`Chart Data : ${chartData}`)
    },[chartData])

    const prepareChartData = (data) => {

        const labels = data.map(item => item._id);
        const sales = data.map(item => item.cohortLifetimeValue);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Customers Life Time Cohorts',
                    data: sales,
                    backgroundColor: "#F0A8D0",
                    borderColor: "#F0A8D0",
                    borderWidth: 1,
                }
            ]
        };
    }



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
            <div className='h'>Customers Life Time Cohorts</div>
            <div className='buttons'>
            </div>
                </div>
            {chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
            </div>
        </>
    );
}

export default CustomerCohorts;
