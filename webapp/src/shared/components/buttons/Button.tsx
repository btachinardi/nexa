import { ButtonColor, ButtonProps, ButtonType } from '@/shared/components/buttons';
import { css } from '@styles/css';

export const Button: React.FC<ButtonProps> = ({ children, disabled, type, color, visible, onClick }) => {
    visible = visible ?? true;
    type = type ?? ButtonType.Regular;
    color = color ?? ButtonColor.Primary;
    disabled = disabled ?? false;

    return visible ? <button
        type='button'
        className={css({
            color: type === ButtonType.Outline ? (
                color === ButtonColor.Primary ? (disabled ? "primary.800" : "primary.600") :
                    (color === ButtonColor.Secondary ? (disabled ? "secondary.800" : "secondary.600") :
                        (color === ButtonColor.Tertiary ? (disabled ? "tertiary.800" : "tertiary.600") :
                            "pink"))) :
                type === ButtonType.Regular ? "white" : "pink",
            bgColor: type === ButtonType.Regular ? (
                color === ButtonColor.Primary ? (disabled ? "primary.800" : "primary.500") :
                    (color === ButtonColor.Secondary ? (disabled ? "secondary.800" : "secondary.500") :
                        (color === ButtonColor.Tertiary ? (disabled ? "tertiary.800" : "tertiary.500") :
                            "pink"))) :
                type === ButtonType.Outline ? "transparent" : "pink",
            borderColor: type === ButtonType.Outline ? (
                color === ButtonColor.Primary ? (disabled ? "primary.800" : "primary.600") :
                    (color === ButtonColor.Secondary ? (disabled ? "secondary.800" : "secondary.600") :
                        (color === ButtonColor.Tertiary ? (disabled ? "tertiary.800" : "tertiary.600") :
                            "pink"))) :
                type === ButtonType.Regular ? "transparent" : "pink",
            borderRadius: "infinite",
            borderWidth: "2px",
            borderStyle: "solid",
            width: "fit-content",
            paddingX: "md.500",
            paddingTop: "sm.300",
            paddingBottom: "sm.500",
            fontSize: "content.500",
            fontWeight: "bold",
            cursor: disabled ? "not-allowed" : "pointer",
        })}
        onClick={onClick} >

        {children}
    </button > : null;
}

