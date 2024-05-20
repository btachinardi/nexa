import { css } from "@styles/css";

export interface CardHeaderProps {
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return (
    <div className={css({
      bgColor: "bg.300",
      fontSize: "title.400",
      fontWeight: "800",
      color: "white",
      width: "100%",
      paddingX: "md",
      paddingY: "sm",
      textAlign: "center"
    })}>
      {children}
    </div>
  )
};
