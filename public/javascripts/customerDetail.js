import * as WorkHistoryUtil from './workHistoryUtil.js';

const addNewWork = (id, date, service) => {
  const newWork = {id, date, service};
  fetch('/addEditCustomer/addWork', {
      method: 'POST',
      body: JSON.stringify(newModel),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => location.href=url);
};

const processClick = (target) => {
  const {dataset: {id}} = target;
  if(target.matches('.removeCustomer')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.editCustomer')) location.href=`/addEditCustomer/${id}`;
  if(target.matches('.addHistoryBtn')) WorkHistoryUtil.openCloseWorkFormDiv();
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({target}) => processClick(target));
});