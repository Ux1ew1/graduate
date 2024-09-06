import { cn } from "../../utils/merge-styles";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
  className,
  onClick,
  variant = "primary",
  type = "button",
  leftIcon,
  icon,
  isLoading,
  loadingText,
  children,
  disabled,
}) => {
  // Варианты стилей для кнопок
  const variantClassess = {
    success: "",
    primary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md",
    warning:
      "bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md",
    info: "bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md",
  };

  // объединение вариантов кнопок, состояния и общих стилей
  const buttonClasses = cn(
    "inline-flex items-center px-4 py-2",
    className,
    !icon && "px-4",
    variantClassess[variant],
    (disabled || isLoading) &&
      "disabled:bg-gray-100 disabled:text-gray-600 disabled:pointer-events-none"
  );

  return (
    <>
      <button
        className={buttonClasses}
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
      >
        {isLoading && (
          <>
            <AiOutlineLoading3Quarters className="animate-spin pointer-events-none mr-2" />
            {loadingText}
          </>
        )}
        {!isLoading && (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {icon}
            {children}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
