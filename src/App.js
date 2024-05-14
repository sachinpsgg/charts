
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,ArcElement
} from 'chart.js';
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import {useState} from "react";
import PieChart from "./PieChart";
import LineStacked from "./LineStacked";

ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
);
function App() {
    const labels = [
        '2023-01-01',
        '2023-01-15',
        '2023-02-01',
        '2023-02-15',
        '2023-03-01',
        '2023-03-15',
        '2023-04-01',
        '2023-04-15',
        '2023-05-01',
        '2023-05-15',
        '2023-06-01',
        '2023-06-15',
        '2023-07-01',
        '2023-07-15',
        '2023-08-01',
        '2023-08-15',
        '2023-09-01',
        '2023-09-15',
        '2023-10-01',
        '2023-10-15',
        '2023-11-01',
        '2023-11-15',
        '2023-12-01',
        '2023-12-15',
    ];

    const datasets = [
        {
            label: 'Dataset 1',
            data: [65, 62, 59, 75, 80, 78, 81, 85, 56, 60, 55, 53, 50, 48, 45, 42, 40, 38, 35, 33, 30, 28, 25, 23],
            // borderColor: 'red',
            backgroundColor: [
                'red',
                'yellow',
                'green',
                'black',
                'purple',
                'pink',
                'violet',
                'orange',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
        },
        {
            label: 'Dataset 2',
            data: [28, 30, 48, 50, 40, 38, 19, 22, 86, 88, 27, 25, 90, 92, 60, 62, 70, 68, 75, 72, 80, 78, 85, 82],
            borderColor: 'blue',
            backgroundColor:[ 'red',
                'yellow',
                'green',
                'black',
                'purple',
                'pink',
                'violet',
                'orange',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',]
        },
    ];
    const [startDate, setstartDate] = useState('2023-01-01');
    const [endDate, setendDate] = useState('2023-12-31');
    const handleStartDateChange = (event) => {
        setstartDate(event.target.value)
    };

    const handleEndDateChange = (event) => {
        setendDate(event.target.value)
    };
  return (
      <div className="App">
          <div className="date-filter">
              <input type="date" id="startDate" value={startDate}
                     onChange={handleStartDateChange}/>
              <input value={endDate} type="date" id="endDate" onChange={handleEndDateChange}/>
          </div>
          <div className="charts">
              <LineChart labels={labels}
                         datasets={datasets}
                         startDate={startDate}
                         endDate={endDate}
                         title="Sample Line Chart"/>
              <BarChart labels={labels}
                        datasets={datasets}
                        startDate={startDate}
                        endDate={endDate}
                        title="Sample Bar Chart"/>
              <PieChart labels={labels}
                        datasets={datasets}
                        startDate={startDate}
                        endDate={endDate}
                        title="Sample Pie Chart"/>
          </div>
      </div>
  );
}

export default App;
