import logo from "../images/logo.svg";
import { Route, Routes, NavLink } from "react-router-dom";

function Header({ userEmail, signtOut }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <NavLink to="/sign-up" className="header__info">
              Регистрация
            </NavLink>
          }
        />
        <Route
          path="/sign-up"
          element={
            <NavLink to="/sign-in" className="header__info">
              Войти
            </NavLink>
          }
        />
        <Route
          path="/"
          element={
            <nav className="header__nav">
              <p className="header__email">{userEmail}</p>
              <NavLink
                to="/sign-in"
                className="header__info header__info_color_grey"
                onClick={signtOut}
              >
                Выйти
              </NavLink>
            </nav>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
