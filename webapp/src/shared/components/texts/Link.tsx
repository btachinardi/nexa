import { ContainerProps } from '@/shared/components/texts/Markdown';
import { styled } from '@styles/jsx';


export interface LinkProps extends ContainerProps {
  href: string;
  color?: string;
  children?: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, color = 'blue', children }) => {
  const linkStyle = {
    color,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  };
  return <styled.a href={href} style={linkStyle}>{children}</styled.a>;
};
