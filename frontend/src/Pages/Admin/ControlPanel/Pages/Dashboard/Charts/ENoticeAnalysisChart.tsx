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
        flex: 1,
      }}
      title='ChartAnalysis'
      width='450'
      height='350'
      src='https://charts.mongodb.com/charts-project-0-yampz/embed/charts?id=7a98ea3a-9cfe-46bf-8abc-f8670c536c7c&theme=light'
    ></iframe>
  );
}
