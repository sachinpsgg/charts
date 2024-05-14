// // src/StackedLineChart.js
// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chartjs-adapter-date-fns';
// import { registerables } from 'chart.js';
//
// import Chart from 'chart.js/auto';
//
// Chart.register(...registerables);
//
// const initialData = [
//     { date: '2024-01-01', category1: 10, category2: 5, category3: 2 },
//     { date: '2024-01-02', category1: 20, category2: 10, category3: 5 },
//     { date: '2024-01-03', category1: 30, category2: 15, category3: 10 },
//     // ... more data points
// ];
//
// const LineStacked = () => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [filteredData, setFilteredData] = useState(initialData);
//
//     const filterData = () => {
//         const filtered = initialData.filter(item => {
//             const itemDate = new Date(item.date);
//             return (!startDate || itemDate >= new Date(startDate)) &&
//                 (!endDate || itemDate <= new Date(endDate));
//         });
//         setFilteredData(filtered);
//     };
//
//     const dates = filteredData.map(item => item.date);
//     const category1Data = filteredData.map(item => item.category1);
//     const category2Data = filteredData.map(item => item.category2);
//     const category3Data = filteredData.map(item => item.category3);
//
//     const chartData = {
//         labels: dates,
//         datasets: [
//             {
//                 label: 'Category 1',
//                 data: category1Data,
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 fill: 'start',
//             },
//             {
//                 label: 'Category 2',
//                 data: category2Data,
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 fill: 'start',
//             },
//             {
//                 label: 'Category 3',
//                 data: category3Data,
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 fill: 'start',
//             },
//         ],
//     };
//
//     const options = {
//         scales: {
//             x: {
//                 type: 'time',
//                 time: {
//                     unit: 'day',
//                     tooltipFormat: 'll',
//                     displayFormats: {
//                         day: 'MMM d',
//                     },
//                 },
//             },
//             y: {
//                 stacked: true,
//             },
//         },
//     };
//
//     return (
//         <div>
//             <div>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                 <button onClick={filterData}>Filter</button>
//             </div>
//             <Line data={chartData} options={options} />
//         </div>
//     );
// };
//
// export default LineStacked;



import React, { useMemo } from 'react';
import { Line } from "react-chartjs-2";

const LineStacked = ({ labels, datasets, title, startDate, endDate }) => {
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

    const data = {
        labels: filteredLabels,
        datasets: filteredDatasets
    };

    // const options = {
    //     responsive: true,
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked
    //         },
    //         tooltip: {
    //             mode: 'index'
    //         },
    //     },
    //     interaction: {
    //         mode: 'nearest',
    //         axis: 'x',
    //         intersect: false
    //     },
    //     scales: {
    //         x: {
    //             title: {
    //                 display: true,
    //                 text: 'Month'
    //             }
    //         },
    //         y: {
    //             stacked: true,
    //             title: {
    //                 display: true,
    //                 text: 'Value'
    //             }
    //         }
    //     }
    // };
    // const options = {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 unit: 'day',
    //                 tooltipFormat: 'll',
    //                 displayFormats: {
    //                     day: 'MMM d',
    //                 },
    //             },
    //         },
    //         y: {
    //             stacked: true,
    //         },
    //     },
    // };
    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MMM d',
                    displayFormats: {
                        day: 'MMM d',
                    },
                },
            },
            y: {
                stacked: true,
            },
        },
    };
    return <Line options={options} data={data} />;
};

export default LineStacked;
