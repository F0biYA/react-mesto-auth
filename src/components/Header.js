import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

function Header({ email }) {

    /*функция выхода и удаления токена*/
    function signOut() {
        localStorage.removeItem('token');
    }

    return <header className="header">
        <div className="header__logo">
        </div>
        <Switch>
            <Route path="/sign-up">
                <Link className="header__link" to='sign-in'>Войти</Link>
            </Route>
            <Route path="/sign-in">
                <Link className="header__link" to='sign-up'>Регистрация</Link>
            </Route>
            <Route path="/">
                <div className="header__info">
                    <span className="header__email">{email}</span>
                    <Link className="header__link" to='/sign-in' onClick={signOut}>Выйти</Link>
                </div>
            </Route>
        </Switch>
    </header>
}

export default Header;