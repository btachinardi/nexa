import React from 'react';
import { ContainerProps } from './Markdown';

const StrikeThrough: React.FC<ContainerProps> = ({ text }) => {
  return <s>{text}</s>;
};

export default StrikeThrough;

