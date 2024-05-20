import React from 'react';
import { Block } from 'typescript';

enum BlockType {
  Code = 'code',
  Blockquote = 'blockquote',
  Title = 'title',
  HorizontalRule = 'hr',
  UnorderedList = 'ul',
  OrderedList = 'ol',
  ListItem = 'li',
  Strong = 'strong',
  Italic = 'italic',
  Paragraph = 'paragraph',
  Link = 'link',
  Image = 'image'
}

interface ComponentsProps {
  [BlockType.Blockquote]: ContainerProps,
  [BlockType.HorizontalRule]: Record<string, never>,
  [BlockType.UnorderedList]: ,
  [BlockType.OrderedList]: {},
  [BlockType.ListItem]: {},
  [BlockType.Strong]: {},
  [BlockType.Italic]: {},
  [BlockType.Paragraph]: {},
  [BlockType.Code]: { language: string };
  [BlockType.Title]: { level: number };
  [BlockType.Link]: { href: string };
  [BlockType.Image]: { src: string, alt: string };
}

interface Block<TType extends BlockType = BlockType> {
  type: TType,
  props: ComponentsProps[TType],
  children: Block[]
}

export interface ContainerProps {
  children: React.ReactNode;
}

export interface TextProps {
  text: string;
}

const Markdown: React.FC<ContainerProps> = ({ text }) => {

  // Transforming regexp replacement into a text parser that outputs an array of objects
  const parseMarkdown = (text: string): Block[] => {
    const blocks: Block[] = [];
    const lines = text.split('\n');

    const currentBlock: Block | null = null;

    lines.forEach(line => {
      if (/^```(\w+)?/.test(line)) {
        const lang = line.match(/^```(\w+)?/)[1] || 'plaintext';
        const code = [];
        while (!/^```$/.test(line)) {
          code.push(line);
          line = lines.shift();
        }
        blocks.push({
          type: 'code',
          props: { language: lang },
          children: [{ type: 'text', props: {}, children: [], content: code.join('\n').slice(4, -3).trim() }]
        });
      } else if (/^>\s*(.*)$/.test(line)) {
        blocks.push({
          type: 'blockquote',
          props: {},
          children: [{ type: 'text', props: {}, children: [], content: line.slice(2) }]
        });
      } else if (/^(#{1,6})\s*(.+)$/.test(line)) {
        const level = line.match(/^(#{1,6})/)[0].length;
        blocks.push({
          type: 'title',
          props: { level },
          children: [{ type: 'text', props: {}, children: [], content: line.slice(level + 1) }]
        });
      } else if (/^\s*---+\s*$/.test(line)) {
        blocks.push({
          type: 'hr',
          props: {},
          children: []
        });
      } else if (/^\s*\*\s+(.*)/.test(line) || /^\s*\d+\.\s+(.*)/.test(line)) {
        const listType = line.trim().startsWith('*') ? 'ul' : 'ol';
        const items = [];
        do {
          items.push({ type: 'li', props: {}, children: [{ type: 'text', props: {}, children: [], content: line.replace(/^\s*[\*\d\.]\s+/, '') }] });
          line = lines.shift();
        } while (line && (/^\s*\*\s+(.*)/.test(line) || /^\s*\d+\.\s+(.*)/.test(line)));
        blocks.push({
          type: listType,
          props: {},
          children: items
        });
      } else if (/(\*\*|__)(.*?)\1/.test(line)) {
        blocks.push({
          type: 'strong',
          props: {},
          children: [{ type: 'text', props: {}, children: [], content: line.replace(/(\*\*|__)/g, '') }]
        });
      } else if (/(\*|_)(.*?)\1/.test(line)) {
        blocks.push({
          type: 'italic',
          props: {},
          children: [{ type: 'text', props: {}, children: [], content: line.replace(/(\*|_)/g, '') }]
        });
      } else if (/`([^`]+)`/.test(line)) {
        blocks.push({
          type: 'code',
          props: {},
          children: [{ type: 'text', props: {}, children: [], content: line.match(/`([^`]+)`/)[1] }]
        });
      } else if (/\[([^\]]+)\]\(([^)]+)\)/.test(line)) {
        const matches = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        blocks.push({
          type: 'link',
          props: { href: matches[2] },
          children: [{ type: 'text', props: {}, children: [], content: matches[1] }]
        });
      } else if (/!\[([^\]]*)\]\(([^)]+)\)/.test(line)) {
        const matches = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        blocks.push({
          type: 'image',
          props: { src: matches[2], alt: matches[1] },
          children: []
        });
      } else {
        blocks.push({
          type: 'paragraph',
          props: {},
          children: [{ type: 'text', props: {}, children: [], content: line }]
        });
      }
    });

    return blocks;
  };

  return (
    <div>
      {React.Children.toArray(renderText(text).split(/(<\/?[a-z]+[^>]*>)/i).filter(Boolean).map(part => {
        if (/<\/?[a-z]+[^>]*>/i.test(part)) {
          return React.createElement('span', { dangerouslySetInnerHTML: { __html: part } });
        } else {
          return part;
        }
      }))}
    </div>
  );
};

export default Markdown;
