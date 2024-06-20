interface IButtonProps {
  content: any;
  variant?: string;
  disabled?: boolean;
  executing?: boolean;
  onClick?: () => void;
}

const Button = (props: IButtonProps) => {
  const { content, variant, onClick, executing, disabled } = props;
  return (
    <button
      disabled={executing || disabled}
      className={`button ${variant}`}
      onClick={onClick}
    >
      {executing ? <div className="lds-hourglass"> </div> : content}
    </button>
  );
};

export default Button;
