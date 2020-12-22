const register = (userFirstName, userLastName, username, password) => {
  const newUser = {
    userFirstName,
    userLastName,
    username,
    password
  };

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
  if (registerButton) {
    registerButton.addEventListener('click', () => {
      const userFirstName = document.querySelector('#userFirstName').value;
      const userLastName = document.querySelector('#userLastName').value;
      const username = document.querySelector('#newUsername').value;
      const password = document.querySelector('#newPassword').value;
      Register.register(userFirstName, userLastName, username, password);
    });
  };
});