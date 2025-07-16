import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import './VaccinationCoverage.css';

function VaccinationCoverage({ vaccinationCoverageDetails }) {
  // 📊 Format Y-axis values for readability
  const formatNumber = (number) => {
    return number > 1000 ? `${(number / 1000).toFixed(1)}k` : number.toString();
  };

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={vaccinationCoverageDetails}
        margin={{ top: 5 }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={formatNumber}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  );
}

// ✅ Optimize performance: only re-render if props change
export default React.memo(VaccinationCoverage);
