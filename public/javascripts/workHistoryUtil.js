import * as Util from './util.js';

const messageDiv = () => document.querySelector('.messageDiv');

const openCloseWorkFormDiv = () => {
  const formDiv = document.querySelector('.workForm');
  if(formDiv.style.display === 'none'){
    formDiv.style.display = 'block';
  }else{
    formDiv.style.display = 'none';
  }
};

const addWork = (customerId, date, service) => {
  const work = {
    customerId, 
    date, 
    service
  };
  
  fetch('/customerDetail/addWork', {
      method: 'POST',
      body: JSON.stringify(work),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => {
      Util.insertMessage(messageDiv(), false, 'Saved Work');
      const btn = document.querySelector('.btnMessage');
      btn.addEventListener('click', () => {
        location.href = url;
      });
    });
};

export {
  openCloseWorkFormDiv,
  addWork
}