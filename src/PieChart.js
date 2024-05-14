// import React, {useMemo} from 'react';
// import {Pie} from "react-chartjs-2";
//
// const BarChart=({ labels, datasets, title, startDate, endDate })=>{
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const filterDataByDate = (labels, datasets, start, end) => {
//         // Filtered labels based on the date range
//         const filteredLabels = labels.filter((label, index) => {
//             const date = new Date(label);
//             return date >= start && date <= end;
//         });
//         const filteredDatasets = datasets.map(dataset => {
//             const filteredData = dataset.data.filter((dataPoint, index) => {
//                 const date = new Date(labels[index]);
//                 return date >= start && date <= end;
//             });
//             return {
//                 ...dataset,
//                 data: filteredData
//             };
//         });
//
//         return { filteredLabels, filteredDatasets };
//     };
//
//     // Memoize the filtered data
//     const { filteredLabels, filteredDatasets } = useMemo(
//         () => filterDataByDate(labels, datasets, start, end),
//         [labels, datasets, start, end]
//     );
//     const options = {
//         responsive: true,
//
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: title,
//             },
//             datalabels: {
//                 formatter: (value, ctx) => {
//                     let sum = 0;
//                     let dataArr = ctx.chart.data.datasets[0].data;
//                     dataArr.map(data => {
//                         sum += data;
//                     });
//                     let percentage = ((value * 100) / sum).toFixed(2) + "%";
//                     return percentage;
//                 },
//                 color: '#fff',
//             }
//         },
//
//     };
//     const data = { labels: filteredLabels,datasets:filteredDatasets};
//
//     return (
//         <>
//             <Pie data={data}/>;
//         </>);
// }
// export default BarChart;




import React, { useMemo } from 'react';
import { Pie } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

const BarChart = ({ labels, datasets, title, startDate, endDate }) => {
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
                data: filteredData,
                backgroundColor: dataset.backgroundColor ? dataset.backgroundColor.filter((color, index) => {
                    const date = new Date(labels[index]);
                    return date >= start && date <= end;
                }) : []
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
            // datalabels: {
            //     formatter: (value, ctx) => {
            //         let sum = 0;
            //         let dataArr = ctx.chart.data.datasets[0].data;
            //         dataArr.map(data => {
            //             sum += data;
            //         });
            //         let percentage = ((value * 100) / sum).toFixed(2) + "%";
            //         return percentage;
            //     },
            //     color: '#fff',
            // }
        },
    };

    const data = { labels: filteredLabels, datasets: filteredDatasets };

    return (
        <>
            <Pie data={data} options={options} />
        </>
    );
};

export default BarChart;
