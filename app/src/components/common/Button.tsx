import { IButtonProps } from "../../interfaces/IButtonProps";

const Button: React.FC<IButtonProps> = ({ content, onClick, primary }) => {
    const buttonStyle = primary ? 'bg-tertiary  hover:bg-teal-300' : 'bg-secondary border-2 border-solid border-black hover:bg-gray-200';

    return (
        <button className={`py-3 w-1/2 text-sm rounded-md ${buttonStyle}`} onClick={onClick}>
            {content}
        </button>
    );
};

export default Button;