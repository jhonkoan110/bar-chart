import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BarChartProps as SourceBarChartProps, DataType as SourceDataType } from './components/BarChart';
export { BarChart } from './components/BarChart';

export type BarChartProps = SourceBarChartProps;
export type DataType = SourceDataType;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
