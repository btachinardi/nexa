import React from 'react';
import { ContainerProps } from './Markdown';

const Strong: React.FC<ContainerProps> = ({ text }) => {
  return <strong>{text}</strong>;
};

export default Strong;
