import React from 'react';
import { ContainerProps } from './Markdown';

const Underline: React.FC<ContainerProps> = ({ text }) => {
  return <u>{text}</u>;
};

export default Underline;
