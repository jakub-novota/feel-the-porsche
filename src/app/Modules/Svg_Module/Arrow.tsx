import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedArrowProps {
  direction: 'left' | 'right';
  color: string;
  circleColor: string;
  strokeWidth: number;
  circleStrokeWidth: number;
  circleFill: string; // New prop for circle fill color
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({
  direction,
  color,
  circleColor,
  strokeWidth,
  circleStrokeWidth,
  circleFill,
}) => {
  const isRight = direction === 'right';

  const handleClick = () => {
    // Add your logic or functionality for each click here
  };

  return (
    <motion.svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileTap={{ scale: 0.9 }} // Animation effect on click
      onClick={handleClick} // Click event handler
      style={{ outline: 'none' }} // Remove outline on click
    >
      <circle cx="21.5" cy="21.5" r="20.5" stroke={circleColor} fill={circleFill} strokeWidth={circleStrokeWidth} />
      <path d={isRight ? "M14.4223 21.2973H29.0171" : "M29.1968 22.2974H14.602"} stroke={color} strokeWidth={strokeWidth} />
      <path d={isRight ? "M24.2362 26.2578L29.1967 21.2973L24.2362 16.3368" : "M19.3831 17.337L14.4226 22.2974L19.3831 27.2579"} stroke={color} strokeWidth={strokeWidth} />
    </motion.svg>
  );
};

export default AnimatedArrow;
