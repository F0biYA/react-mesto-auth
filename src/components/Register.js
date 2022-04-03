import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

/* компонент для регистрации пользователя с всплывающим попапом статуса регистрации*/
function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  /* функция воода данных в инпуты*/
  function handleChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  /*функция регистрации с всплывающим окном*/
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.register(password, email)
      .then((res) => {
        if (res) {
          setStatus(true);
          setIsInfoPopupOpen(true);
        } else {
          setStatus(false);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  /* функция закрытия и перенаправления на Login*/
  function handleClose() {
    setIsInfoPopupOpen(false);
    if (status) {
      history.push('/sign-in');
    }
  }
  return (
    <form className="authorizationForm" onSubmit={handleSubmit}>
      <h1 className="authorizationForm__title">Регистрация</h1>
      <input
        type="email"
        className="authorizationForm__input"
        name="email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={email || ""}
      />
      <input
        type="password"
        className="authorizationForm__input"
        name="password"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="40"
        onChange={handleChange}
        value={password || ""}
      />
      <button className="authorizationForm__submitButton" type="submit">
        Зарегистрироваться
      </button>
      <Link className="authorizationForm__tip" to="/sign-in"> Уже зарегистрированы? Войти</Link>
      <InfoTooltip
        status={status}
        onClose={handleClose}
        isOpen={isInfoPopupOpen}
      />
    </form>
  );
};
export default Register;
