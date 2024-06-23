import Logo from "./logo";
import "../../../header.css";
import Button from "../../button";
import { LandingProps } from "./landing";

const Header = (props: LandingProps) => {
  const { openModal } = props;

  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <div className="nav-bar" id="navigation-bar">
        <a href="" className="link-item">
          Home
        </a>
        <a href="#get-started" className="link-item">
          Buy Crypto
        </a>
        <a href="#faq" className="link-item">
          FAQ
        </a>
      </div>
      <Button content={"Get Started"} onClick={openModal} variant="large" />
    </div>
  );
};

export default Header;
