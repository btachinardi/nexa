import { TextProps } from '@/shared/components/texts/Markdown';
import React from 'react';

interface BionicProps extends TextProps { }

const Bionic: React.FC<BionicProps> = ({ text }) => {
  // Function to determine how to bold each word
  const processWord = (word: string) => {
    const len = word.length;
    let boldPart: string;
    let regularPart: string;

    if (len === 1) {
      boldPart = word;
      regularPart = '';
    } else if (len === 2) {
      boldPart = word.slice(0, 1);
      regularPart = word.slice(1);
    } else if (len === 3) {
      boldPart = word.slice(0, 1);
      regularPart = word.slice(1);
    } else {
      const half = Math.ceil(len / 2);
      boldPart = word.slice(0, half);
      regularPart = word.slice(half);
    }

    return (
      <span>
        <strong>{boldPart}</strong>{regularPart}
      </span>
    );
  };

  // Split the text into words
  const words = text.split(' ');

  return (
    <div>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {processWord(word)}
          {index < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Bionic;