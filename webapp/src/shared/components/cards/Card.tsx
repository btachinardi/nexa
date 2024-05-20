import { css } from '../../../../styled-system/css';

interface CardProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <div className={css({
    shadow: "md.300",
    bgColor: "bg.200",
    borderRadius: "11px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "-webkit-fill-available",
    ...props
  })}>

    {children}
  </div>;
};
