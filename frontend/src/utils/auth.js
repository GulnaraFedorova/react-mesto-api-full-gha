const BASEURL = "http://localhost:4000";

//проверка на ошибки
const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//запрос регистрации
export const userRegistration = (email, password) => {
  return fetch(`${BASEURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

//запрос авторизации
export const userAuthorization = (email, password) => {
  return fetch(`${BASEURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

//запрос проверки валидности токен
export const tokenValidation = (token) => {
  return fetch(`${BASEURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};
