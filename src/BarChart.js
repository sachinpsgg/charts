import React, {useMemo} from 'react';
import {Bar, Line} from "react-chartjs-2";
import {faker} from 'faker'

const BarChart=({ labels, datasets, title, startDate, endDate })=>{
    // const startDateIndex = labels.indexOf(startDate);
    // const endDateIndex = labels.indexOf(endDate);
    // //
    // const filteredLabels = labels.slice(startDate, endDate);
    // const filteredDatasets = datasets.map(dataset => ({
    //     ...dataset,
    //     data: dataset.data.slice(startDate, endDate)
    // }));
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filterDataByDate = (labels, datasets, start, end) => {
        // Filtered labels based on the date range
        const filteredLabels = labels.filter((label, index) => {
            const date = new Date(label);
            return date >= start && date <= end;
        });
        const filteredDatasets = datasets.map(dataset => {
            const filteredData = dataset.data.filter((dataPoint, index) => {
                const date = new Date(labels[index]);
                return date >= start && date <= end;
            });
            return {
                ...dataset,
                data: filteredData
            };
        });

        return { filteredLabels, filteredDatasets };
    };

    // Memoize the filtered data
    const { filteredLabels, filteredDatasets } = useMemo(
        () => filterDataByDate(labels, datasets, start, end),
        [labels, datasets, start, end]
    );
    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },

    };
    const data = { labels: filteredLabels,datasets:filteredDatasets};

    return (
        <>
            <Bar options={options} data={data}/>;
        </>);
}
export default BarChart;