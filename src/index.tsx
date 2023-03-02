import App from './App';
import { createRoot } from 'react-dom/client';
import { BarChartProps as SourceBarChartProps, DataType as SourceDataType } from './types/BarChart';
import './index.css';

const container = document.getElementById('root');

createRoot(container as HTMLDivElement).render(<App />);

export { BarChart } from './components/BarChart';
export type BarChartProps = SourceBarChartProps;
export type DataType = SourceDataType;
