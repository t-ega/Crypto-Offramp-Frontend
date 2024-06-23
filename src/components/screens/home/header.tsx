import Logo from "./logo";
import "../../../header.css";
import Button from "../../button";

const Header = () => {
  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <div className="">
        <ul className="header_links">
          <li className="link-item">Home</li>
          <li className="link-item">Buy Crypto</li>
          <li className="link-item">Sell Crypto</li>
          <li className="link-item">Swap</li>
        </ul>
      </div>
      <Button content={"Get Started"} variant="large" />
    </div>
  );
};

export default Header;
