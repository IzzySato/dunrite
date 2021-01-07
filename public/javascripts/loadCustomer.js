import * as WorkHistoryUtil from './workHistoryUtil.js';
import * as Search from './search.js';

//all customers store in data
const data = {};

const getCustomerData = () => new Promise((res, rej) => {
  fetch('/customerList/data')
  .then(res => res.json())
  .then(json => {
    data.customers = json;
    res();
  });
});

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
    <li class="data cusID"><span class="cusLiSpan">Id: </span>${_id}</li>
    <li class="data"><span class="cusLiSpan">Name: </span>${customerFirstName} ${customerLastName}</li>
    <li class="data"><span class="cusLiSpan">email:  </span>${email}</li>
    <li class="data"><span class="cusLiSpan">Phone: </span>${phone}</li>
    <li class="data cusAddress"><span class="cusLiSpan">Address: </span>${street} ${city} ${postcode} ${country}</li>
    <li class="data">
      <div>
        <div class="sIcons">
          <i class="fas fa-edit editCustomer customerPageIcon pointer" data-id="${_id}"></i>
          <i class="fas fa-trash-alt removeCustomer customerPageIcon pointer" data-id="${_id}"></i>
          <a class="detailBtn pointer" href="customerDetail/${_id}" data-id="${_id}">Details</a>
        </div>
        <button data-id="${_id}" data-name="${customerFirstName} ${customerLastName}" class="addHistoryBtn pointer detailBtn">Add Work History</button>
      </div>
    </li>
  </ul>`;

const loadCustomer = () => {
  const html = data.customers.map(person => customerTemplate(person)).join('');
  const div = document.querySelector('#dataDiv');
  div.innerHTML = html;
};

const input = document.querySelector('#searchInput');

const processClick = (target) => {
  const {dataset: {id}} = target;
  const {dataset: {name}} = target;

  if(target.matches('.editCustomer')) location.href=`/addEditCustomer/${id}`;
  if(target.matches('.addHistoryBtn')) {
    const customerName = document.querySelector('#cusNameWorkDiv');
    const submitBtn = document.querySelector('#cusSubmitWork');
    submitBtn.dataset.id = id;
    submitBtn.dataset.name = name;
    customerName.innerHTML = `<p class="cusName">Customer Name: </p><p>${name}</P>`
    WorkHistoryUtil.openCloseWorkFormDiv();
  }
  if(target.matches('.submitNewWork')){
    const date = document.querySelector('#cusDateInput').value;
    const service = document.querySelector('#cusWorkInput').value;
    WorkHistoryUtil.addWork( id, date, service);
  }
  if(target.matches('#searchCustomerIcon')){
    const searchVal = input.value;
    Search.searchCustomer( searchVal, data, customerTemplate);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  getCustomerData().then(() => {
    loadCustomer();

    document.addEventListener('click', ({target}) => processClick(target));

    Search.keyUpSearch(input, Search.searchCustomer, data, customerTemplate);
  });
});