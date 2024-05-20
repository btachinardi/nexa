import { MouseEventHandler } from "react";

export interface ButtonProps {
  type?: ButtonType,
  color?: ButtonColor,
  disabled?: boolean;
  visible?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode;
}

export enum ButtonType {
  Regular = "regular",
  Outline = "outline"
}

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary"
}