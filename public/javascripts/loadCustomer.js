import * as WorkHistoryUtil from './workHistoryUtil.js';

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
      <button data-id="${_id}" data-name="${customerFirstName} ${customerLastName}" class="addHistoryBtn">Add Work History</button>
    </div>
  </li>
</ul>`;

const loadCustomer = () => {
  const html = data.customers.map(person => customerTemplate(person)).join('');
  const div = document.querySelector('#dataDiv');
  div.innerHTML = html;
};

const serachCustomer = (searchVal) => {
  const seachValLoercase = searchVal.toLowerCase();
  let foundCustomer = [];
  data.customers.forEach(customer => {
    if(customer.customerFirstName.toLowerCase() === seachValLoercase || 
      customer.customerLastName.toLowerCase() === seachValLoercase || 
      customer.phone === searchVal){
        foundCustomer.push(customer);
      }
  });
  if(foundCustomer !== null){
    const foundCustomerDiv = document.querySelector('#foundCustomerDiv');
    const html = foundCustomer.map(customer => customerTemplate(customer)).join('');
    foundCustomerDiv.innerHTML = html;
  }
};

const processClick = (target) => {
  const {dataset: {id}} = target;
  const {dataset: {name}} = target;
  if(target.matches('.removeCustomer')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.editCustomer')) location.href=`/addEditCustomer/${id}`;
  if(target.matches('.addHistoryBtn')) {
    const customerName = document.querySelector('#cusNameP');
    const submitBtn = document.querySelector('#cusSubmitWork');
    submitBtn.dataset.id = id;
    submitBtn.dataset.name = name;
    customerName.innerHTML = `Customer Name: ${name}`
    WorkHistoryUtil.openCloseWorkFormDiv();
  }
  if(target.matches('.submitNewWork')){
    const date = document.querySelector('#cusDateInput').value;
    const service = document.querySelector('#cusWorkInput').value;
    WorkHistoryUtil.addWork( id, date, service);
  }
  if(target.matches('.cancel')){
    const formDiv = document.querySelector('.workForm');
    formDiv.style.display = 'none';
  }
  if(target.matches('#searchCustomerIcon')){
    const searchVal = document.querySelector('#searchInput').value;
    serachCustomer(searchVal);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  getCustomerData().then(() => {
    loadCustomer();
    document.addEventListener('click', ({target}) => processClick(target));
  });
});