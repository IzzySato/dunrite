import * as ProductConfig from './productConfig.js';
//add cutomer in the database
const addCustomer = (
  id,
  customerFirstName,
  customerLastName,
  phone,
  email,
  street,
  city,
  postcode,
  country = 'Canada',
  hottubModel,
  history = [],
  comments = '') => {
  const customer = {
    id,
    customerFirstName,
    customerLastName,
    phone,
    email,
    street,
    city,
    postcode,
    country,
    hottubModel,
    history,
    comments
  };

  fetch('/addEditCustomer/add', {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({
      url
    }) => location.href = url);
};

const processClick = (target) => {
  if (target.matches('#newCustomerButton')) {
    const id = document.querySelector('#form').dataset.id;
    const customerFirstName = document.querySelector('#customerFirstName').value;
    const customerLastName = document.querySelector('#customerLastName').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const street = document.querySelector('#street').value;
    const city = document.querySelector('#city').value;
    const postcode = document.querySelector('#postcode').value;
    const country = document.querySelector('#country').value;
    const hottubModel = document.querySelector('#model').value;
    const date = document.querySelector('#date').value;
    const service = document.querySelector('#work').value;
    const comments = document.querySelector('#comments').value;

    const history = {
      date,
      service
    };

    addCustomer(
      id,
      customerFirstName,
      customerLastName,
      phone,
      email,
      street,
      city,
      postcode,
      country,
      hottubModel,
      history,
      comments
    );
  }
};

document.addEventListener('DOMContentLoaded', function () {
  ProductConfig.insertBrandOptionsHTML();
  document.addEventListener('click', ({
    target
  }) => processClick(target));
});