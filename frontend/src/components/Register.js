import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    handleRegister(formValue.email, formValue.password);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmitButton}>
        <h2 className="auth__header">Регистрация</h2>
        <input
          id="email-input"
          type="email"
          onChange={handleChange}
          value={formValue.email}
          className="auth__input"
          name="email"
          required
          placeholder="Email"
          minLength="8"
          maxLength="40"
          autoComplete="on"
        />
        <span className="" />
        <input
          id="password-input"
          type="password"
          onChange={handleChange}
          value={formValue.password}
          className="auth__input"
          name="password"
          required
          placeholder="Пароль"
          minLength="6"
          maxLength="18"
          autoComplete="on"
        />
        <span className="" />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
