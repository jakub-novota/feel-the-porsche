import React from 'react';

interface StatusProps {
  quantity: number;
  activePosition: number;
}

function Status({ quantity, activePosition }: StatusProps) {
  const rectangleWidth = 24.5143;
  const spacing = 10; // Adjust the spacing value as needed
  const totalWidth = (rectangleWidth + spacing) * quantity - spacing;

  const rectangles = [];
  for (let i = 0; i < quantity; i++) {
    const xPosition = i * (rectangleWidth + spacing);
    const isActive = i === activePosition;

    if (isActive) {
      rectangles.push(
        <g key={i}>
          <rect
            x={xPosition}
            y="0.349976"
            width={rectangleWidth}
            height="3.54"
            fill="white"
          />
          <rect
            x={xPosition}
            y="3.349976"
            width={rectangleWidth}
            height="1"
            fill="white"
          />
        </g>
      );
    } else {
      rectangles.push(
        <rect
          key={i}
          x={xPosition}
          y="0.349976"
          width={rectangleWidth}
          height="3.54"
          fill="white"
          fillOpacity="0.45"
        />
      );
    }
  }

  return (
    <svg width={totalWidth} height="5.54" viewBox={`0 0 ${totalWidth} 5.54`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {rectangles}
    </svg>
  );
}

export default Status;
