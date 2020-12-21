const login = (username, password) => {
  const user = {
    username,
    password
  };
  console.log(user);

  fetch('/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({
      url
    }) => location.href = url);
};

const register = (userFirstName, userLastName, username, password) => {
  const newUser = {
    userFirstName,
    userLastName,
    username,
    password
  };
  console.log(newUser);

  fetch('/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({
      url
    }) => location.href = url);
};

document.addEventListener('DOMContentLoaded', function () {
  const registerButton = document.querySelector('#registerButton');
  const loginButton = document.querySelector('#loginButton');

  if (registerButton) {
    registerButton.addEventListener('click', () => {
      const userFirstName = document.querySelector('#userFirstName').value;
      const userLastName = document.querySelector('#userLastName').value;
      const username = document.querySelector('#newUsername').value;
      const password = document.querySelector('#newPassword').value;
      register(userFirstName, userLastName, username, password);
    });
  };

  if (loginButton) {
    loginButton.addEventListener('click', () => {
      console.log('clicked');
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      login(username, password);
    });
  };

});