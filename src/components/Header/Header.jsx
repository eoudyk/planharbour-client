import "../Header/Header.scss";
import Logo from "../../assets/PLANHARBOUR.logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/user-home");
  };
  return (
    <div className="header">
      <nav className="navbar">
        <img
          className="navbar__logo"
          src={Logo}
          onClick={handleLogoClick}
          alt="plan harbour logo"
        ></img>
      </nav>
    </div>
  );
};

export default Header;
