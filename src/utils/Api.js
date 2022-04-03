class Api {
    constructor({ address, headers }) {
      this._address = address;
      this._headers = headers;
    }
    /*приватный метод проверки ответа сервера*/
    _handleResponse(response) {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  
    /*метод закгрузки информации о пользователе с сервера (GET)*/
    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод закгрузки карточек с сервера  (GET)  */
    getServerCards() {
      return fetch(`${this._address}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод редактирования профиля (PATCH)   */
    patchUserInfo(data) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод добавления карточки (POST)    */
    postCard(card) {
      return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(card),
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод удаления карточки (DELETE)   */
    deleteCard(cardId) {
      return fetch(`${this._address}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((response) => this._handleResponse(response));
    }
  
  
    /*метод постановки лайка (PUT)    */
    putLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод удаления лайка (DELETE)     */
    deleteLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((response) => this._handleResponse(response));
    }
  
    /*метод обновления аватара пользователя (PATCH)   */
    patchAvatar(avatarLink) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar: avatarLink }),
      })
        .then((response) => this._handleResponse(response));
    }
  }
/* созадем и экспортируем экземпляр API класса*/
  export const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort-35",
    headers: {
      authorization: "59fa2368-57bc-421b-8a9b-bec049dce68e",
      "Content-Type": "application/json",
    },
  });