import React, { useState } from "react";

function Login({ handleLogin }) {
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
    handleLogin(formValue.email, formValue.password);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmitButton}>
        <h2 className="auth__header">Вход</h2>
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
        <span className="email-input-error auth__input-error" />
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
        <span className="passwd-input-error auth__input-error" />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
