import React from 'react';
import { ContainerProps } from './Markdown';

export interface CodeProps extends ContainerProps {
}

const Code: React.FC<CodeProps> = ({ text }) => {
  return <code>{text}</code>;
};

export default Code;

