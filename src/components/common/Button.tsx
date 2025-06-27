import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'calm';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  animate?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  animate = true
}) => {
  const baseStyles = 'font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white',
    calm: 'bg-gradient-to-r from-calm-100 to-calm-200 hover:from-calm-200 hover:to-calm-300 text-calm-800 border-2 border-calm-300'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const MotionComponent = animate ? motion.button : 'button';
  const motionProps = animate ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  } : {};

  return (
    <MotionComponent
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...motionProps}
    >
      {Icon && <Icon size={size === 'xl' ? 28 : size === 'lg' ? 24 : 20} />}
      {children}
    </MotionComponent>
  );
};