import React from 'react';
import { ContainerProps } from './Markdown';

export interface EmphasisProps extends ContainerProps {
  text: string;
}

const Emphasis: React.FC<EmphasisProps> = ({ text }) => {
  return <em>{text}</em>;
};

export default Emphasis;

