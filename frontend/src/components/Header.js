import { Route } from "react-router";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ exit, email, loggedIn }) => {

  return (
    <header className="header content content_place_header">
      <a className="page-link" href="./" target="_parent">
        <img className="logo" src={logo} alt="логотип" />
      </a>
      <Route path="/sign-in">
        <Link to="sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link to="sign-in" className="header__link">
          Войти
        </Link>
      </Route>
      <div className={`header__box ${loggedIn ? "header__box_visiable" : null}`}>
        <p className="header__email">{email}</p>
        <button
          onClick={() => {
            exit()
          }}
          className="header__login-link page-link"
        >
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;
