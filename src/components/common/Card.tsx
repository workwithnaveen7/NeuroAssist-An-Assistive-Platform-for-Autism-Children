import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  animate = true,
  hover = true,
  onClick
}) => {
  const baseStyles = 'bg-white rounded-3xl shadow-lg border border-calm-200 overflow-hidden transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  const MotionComponent = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <MotionComponent
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
};