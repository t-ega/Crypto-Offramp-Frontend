interface IButtonProps {
  content: any;
  variant?: string;
  onClick?: () => void;
}

const Button = (props: IButtonProps) => {
  const { content, variant, onClick } = props;
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
