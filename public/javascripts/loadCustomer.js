import * as WorkHistoryUtil from './workHistoryUtil.js';

const customerTemplate = ({
  _id,
  customerFirstName,
  customerLastName,
  phone,
  email,
  street,
  city,
  postcode,
  country
}) =>
  `    
  <ul class="custmerData">
  <li class="data cusID">${_id}</li>
  <li class="data">${customerFirstName} ${customerLastName}</li>
  <li class="data">${email}</li>
  <li class="data">${phone}</li>
  <li class="data cusAddress">${street} ${city} ${postcode} ${country}</li>
  <li class="data">
    <div>
      <div class="sIcons">
        <i class="fas fa-edit editCustomer customerPageIcon" data-id="${_id}"></i>
        <i class="fas fa-trash-alt removeCustomer customerPageIcon" data-id="${_id}"></i>
        <a class="detailBtn" href="customerDetail/${_id}" data-id="${_id}">Details</a>
      </div>
      <button class="addHistoryBtn">Add Work History</button>
    </div>
  </li>
</ul>`;

const processClick = (target) => {
  const {dataset: {id}} = target;
  if(target.matches('.removeCustomer')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.editCustomer')) location.href=`/addEditCustomer/${id}`;
  if(target.matches('.addHistoryBtn')) WorkHistoryUtil.openCloseWorkFormDiv();
};

const loadCustomer = () => {
  fetch('/customerList/data')
  .then(res => res.json())
  .then(data => {
    const html = data.map(person => customerTemplate(person)).join('');
    const div = document.querySelector('#dataDiv');
    div.innerHTML = html;

    document.addEventListener('click', ({target}) => processClick(target));
  });
};

document.addEventListener('DOMContentLoaded', function () {
  loadCustomer();
});