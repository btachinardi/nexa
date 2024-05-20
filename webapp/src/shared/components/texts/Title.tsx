import React from 'react';
import { ContainerProps } from './Markdown';

const Title: React.FC<ContainerProps> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Title;
