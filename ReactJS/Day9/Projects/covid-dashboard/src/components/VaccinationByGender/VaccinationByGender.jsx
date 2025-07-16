import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import './VaccinationByGender.css';

function VaccinationByGender({ vaccinationByGenderDetails }) {
  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationByGenderDetails}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: 12, fontFamily: 'Roboto' }}
        />
      </PieChart>
    </div>
  );
}

export default React.memo(VaccinationByGender);
