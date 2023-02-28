import React, { useState } from 'react';
import './App.css';
import { TestChart } from './components/TestChart';

const mock = [
  {
    name: 'Jan',
    dohod: 360,
    rashod: 255,
    asdasd: 112,
    asdasd2: 112,
    asdasd3: 342,
    asdasd4: 342,
  },
  {
    name: 'Feb',
    dohod: 255,
    asdasd: 112,
    asdasd2: 40,
    asdasd3: 44,
    rashod: 450,
    фывыфвЖ: 40,
  },
  {
    name: 'Feb',
    dohod: 255,
    asdasd: 112,
    asdasd2: 40,
    asdasd3: 70,
    rashod: 200,
  },
  {
    name: 'Feb',
    dohod: 255,
    asdasd: 112,
    asdasd2: 40,
    asdasd3: 70,
    rashod: 200,
  },
];

function App() {
  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 300,
  });

  const toggle = () => {
    if (dimensions.width === 1000 && dimensions.height === 300) {
      setDimensions({ height: 600, width: 300 });
    } else {
      setDimensions({ width: 1000, height: 300 });
    }
  };

  return (
    <div className="App">
      <button onClick={toggle}>toggle</button>
      <TestChart
        orientation="vertical"
        height={dimensions.height}
        width={dimensions.width}
        data={mock}
        colors={['#ccc', 'blue', 'yellow', 'green', 'brown', 'grey', 'lightblue']}
        legends={['Доход', 'Расход', 'Что-то', 'Hello', 'Goobye', 'Car', 'test']}
        xAxisName="X"
        yAxisName="Y"
        ticks={10}
      />

      <svg height="150" width="400">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: 'yellow',
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: 'red',
              }}
            />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
      </svg>
    </div>
  );
}

export default App;
