import { IButtonProps } from "../../interfaces/IButtonProps";

const Button: React.FC<IButtonProps> = ({
  content,
  onClick,
  primary,
  href,
}) => {
  const buttonStyle = primary
    ? "bg-tertiary hover:bg-teal-300"
    : "bg-secondary border-2 border-solid border-black hover:bg-gray-200";
  const sharedStyles = `py-2 sm:py-3 w-full sm:w-1/2 text-xs sm:text-sm rounded-md text-center inline-block ${buttonStyle}`;

  if (href) {
    return (
      <a
        href={href}
        className={sharedStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button className={sharedStyles} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
