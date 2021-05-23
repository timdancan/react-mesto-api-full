import { Link } from "react-router-dom";
import { useState } from 'react';

export const Register = ({onRegister}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    let {email, password} = userData
    onRegister({ email, password })
  } 

  return (
    <div className="register">
      <p className="sign-title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="sign-input"
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="sign-input"
        />
        <div className="register__button-container">
          <button
            type="submit"
            className="sign-button"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__login-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};
