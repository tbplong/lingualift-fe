import { cn } from "@/utils/cn";

import {
  ButtonVariantType,
  ButtonThemeType,
  ButtonSizeType,
  ButtonIcon,
  ButtonShapeType,
  ButtonWidthType,
  ButtonShape,
  ButtonWidth,
  ButtonVariant,
  ButtonTheme,
  ButtonSize,
} from "./types";
import { themeConfig } from "./config";

type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariantType;
  theme?: ButtonThemeType;
  size?: ButtonSizeType;
  leadingIcon?: ButtonIcon;
  trailingIcon?: ButtonIcon;
  shape?: ButtonShapeType;
  width?: ButtonWidthType;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
};

export function Button({
  children,
  disabled,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  isLoading,
  shape = ButtonShape.ROUNDED_SQUARE,
  width = ButtonWidth.FIT,
  variant = ButtonVariant.CONTAINED,
  theme = ButtonTheme.PRIMARY,
  size = ButtonSize.MEDIUM,
}: ButtonProps) {
  const themeClasses = themeConfig[theme];

  const buttonClass = cn(
    width === ButtonWidth.FULL ? "w-full" : "w-fit",
    variant === ButtonVariant.CONTAINED &&
      (disabled
        ? `${themeClasses.lightBackground} ${themeClasses.mediumText}`
        : `${themeClasses.mediumBackground} ${themeClasses.boldBackgroundOnHover} text-white hover:cursor-pointer`),
    variant === ButtonVariant.OUTLINED &&
      (disabled
        ? `${themeClasses.lightBorder} ${themeClasses.mediumText} border`
        : `${themeClasses.mediumBorder} ${themeClasses.mediumText} ${themeClasses.lightBackgroundOnHover} border`),
    variant === ButtonVariant.TEXT &&
      (disabled
        ? `${themeClasses.lightText}`
        : `${themeClasses.mediumText} ${themeClasses.lightBackgroundOnHover}`),
    size === ButtonSize.SMALL && "h-8 text-sm",
    size === ButtonSize.MEDIUM && "h-10 text-base",
    size === ButtonSize.LARGE && "h-12 text-lg",
    children ? "px-3 py-2" : "aspect-square p-2",
    shape === ButtonShape.PILL ? "rounded-full" : "rounded-lg",
    "relative flex items-center justify-center overflow-hidden transition-all duration-100",
    className,
  );

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClass}
    >
      {leadingIcon ? (
        <img
          src={leadingIcon.filename}
          alt={leadingIcon.filename}
          className={cn(children && "me-2", "h-full w-auto")}
        />
      ) : null}

      {children}

      {trailingIcon ? (
        <img
          src={trailingIcon.filename}
          alt={trailingIcon.filename}
          className={cn(children && "ms-2", "h-full w-auto")}
        />
      ) : null}
    </button>
  );
}
