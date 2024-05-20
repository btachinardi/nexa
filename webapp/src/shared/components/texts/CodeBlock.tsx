import React from 'react';
import { ContainerProps } from './Markdown';

export interface CodeBlockProps extends ContainerProps {
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ text }) => {
  return <pre>{text}</pre>;
};

export default CodeBlock;