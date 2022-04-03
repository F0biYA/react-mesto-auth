import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

/* компонет для входа с всплывающим попапом статуса*/
function Login({ handleLogin }) {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  /* функция ввода в инпуты*/
  function handleChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }
  /*функция входа  с всплывающим окном при неправильном вводе*/
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => {
        setStatus(false);
        setIsInfoPopupOpen(true);
        console.log(err)
      });
  }

  function handleClose() {
    setIsInfoPopupOpen(false);
  }
  return (
    <form className="authorizationForm" onSubmit={handleSubmit}>
      <h1 className="authorizationForm__title">Вход</h1>
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
        Войти
      </button>
      <InfoTooltip
        status={status}
        onClose={handleClose}
        isOpen={isInfoPopupOpen}
      />
    </form>

  );
};
export default Login;