import { css } from "@styles/css";

export interface CardBodyProps {
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <div className={css({
      display: "flex",
      flexDirection: "column",
      gap: "md.100",
      paddingX: "md",
      paddingY: "md.100",
      fontSize: "content.500",
      fontWeight: "500",
      color: "text.500",
      flexGrow: 1,
      maxHeight: "calc(100% - 60px)"
    })}>
      {children}
    </div>
  )
};
