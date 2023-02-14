import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { colors } from '../utils/colors';

const SurveyResults = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  //   const fetchData = async () => {
  //     const surveyData = await getDataFromMySQL(); // function to fetch data from MySQL
  //     setData(surveyData);
  //   };
  //   fetchData();
  // }, []);
  // Mock data for testing purposes
  const mockData = [
    { title: 'Answer 1', value: 16 },
    { title: 'Answer 2', value: 23 },
    { title: 'Answer 3', value: 21 },
  ];
  setData(mockData);
}, []);

  const total = data.reduce((acc, { value }) => acc + value, 0);
  const percentages = data.map(({ value }) => ((value / total) * 100).toFixed(2));

  const chartStyle = {
    height: '300px',
    margin: '0 auto',
  };

  const labelStyle = {
    fontSize: '8px',
    fontFamily: 'sans-serif',
    fill: '#fff',
  };

  const segmentsStyle = {
    transition: 'stroke .3s',
    cursor: 'pointer',
  };

  const animateDuration = 500;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Survey Results</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-300 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Answers</h2>
          <ul className="list-disc list-inside">
            {data.map(({ title }, index) => (
              <li key={index}>
                {title}: {percentages[index]}%
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-300 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Graph</h2>
          <div style={chartStyle}>
            <PieChart
              data={data}
              lineWidth={30}
              animate={true}
              animationDuration={animateDuration}
              label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
              labelStyle={labelStyle}
              segmentsStyle={segmentsStyle}
              segmentsShift={(index) => (index === 0 ? 6 : 2)}
              animate
              labelPosition={110}
              center={[50, 50]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResults;