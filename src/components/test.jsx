import React from 'react';
import { BarChart } from './BarChart';

const mock = [
  {
    name: 'Jan',
    values: [1],
  },
  {
    name: 'Feb',
    values: [2],
  },
  {
    name: 'Mar',
    values: [3,2,3,1,2,4,4,5,6,7,8],
  },
  {
    name: 'Apr',
    values: [4],
  },
];

export const Test = () => {
  return (
    <div>
      <BarChart data={mock} width={400} height={300} ticks={14} />
    </div>
  );
};
