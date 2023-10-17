import "../Header/Header.scss";
import Logo from "../../assets/planharbour-logoshort.svg";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar">
        <img className="navbar__logo" src={Logo} alt="plan harbour logo"></img>
      </nav>
    </div>
  );
};

export default Header;