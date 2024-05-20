import { css } from "@styles/css";

interface BodyProps {
  children?: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className={css({
    fontSize: "text.500",
    color: "text.500",
    bgColor: "bg.500",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100vh",
    gap: "md.100",
  })}>

    {children}
  </div>;
};
