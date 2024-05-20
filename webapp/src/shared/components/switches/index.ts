import { ChangeEventHandler } from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  isCheckedIcon?: React.ReactNode;
  isCheckedClasses?: string;
  isCheckedTitle?: string;

  isNotCheckedIcon?: React.ReactNode;
  isNotCheckedClasses?: string;
  isNotCheckedTitle?: string;
}

