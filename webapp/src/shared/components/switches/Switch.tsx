import { SwitchProps } from "@/shared/components/switches";
import { useState } from "react";



const Switch: React.FC<SwitchProps> = (props) => {
  const [isChecked, setIsChecked] = useState(true); // Assuming default is 'true' for light theme

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <button
      className={isChecked ? props.isCheckedClasses : props.isNotCheckedClasses}
      type="button"
      role="switch"
      title={isChecked ? (props.isCheckedTitle ?? "Switch off") : (props.isNotCheckedTitle ?? "Switch on")}
      aria-checked={isChecked}
      onClick={toggleSwitch}
    >
      <div>
        {isChecked ? props.isCheckedIcon : props.isNotCheckedIcon}
      </div>
    </button>
  );
};

export default Switch;
