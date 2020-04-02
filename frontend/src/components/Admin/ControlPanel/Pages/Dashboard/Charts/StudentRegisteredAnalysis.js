import React from 'react';

export default function ChartAnalysis() {
  return (
    <iframe
      style={{
        background: 'linear-gradient(to right, #d3cce3, #e9e4f0)',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0px 5px 10px 0px rgba(70, 76, 79, .2)',
        margin: '10px',
        flex: 1
      }}
      width='450'
      height='350'
      src='https://charts.mongodb.com/charts-project-0-yampz/embed/charts?id=71dedfd0-e4c4-4f29-ba4c-3412fa196455&autorefresh=300&theme=light'
    ></iframe>
  );
}
