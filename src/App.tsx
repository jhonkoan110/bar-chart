import React from 'react';
import { BarChart, DataType } from './components/BarChart';
import { Test } from './components/test';

const mock: DataType[] = [
  {
    name: 'Jan',
    values: [360, 255],
  },
  {
    name: 'Feb',
    values: [100, 25],
  },
  {
    name: 'Mar',
    values: [456, 123],
  },
  {
    name: 'Apr',
    values: [111],
  },
];

function App() {
  return (
    <div className="App">
      <h1>Горизонатльная ориентация</h1>
      <BarChart
        orientation="horizontal"
        height={300}
        width={500}
        data={mock}
        colors={['lightgreen', 'lightcoral']}
        legends={['Доход', 'Расход']}
        xAxisName="Details"
        yAxisName="Month"
      />

      <h1>Вертикальная ориентация</h1>
      <BarChart
        orientation="vertical"
        height={400}
        width={400}
        data={mock}
        colors={['lightgreen', 'lightcoral']}
        legends={['Доход', 'Расход']}
        xAxisName="Month"
        yAxisName="Details"
      />
      <Test />
    </div>
  );
}

export default App;
