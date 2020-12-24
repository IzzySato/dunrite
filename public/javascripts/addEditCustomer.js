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

const openDivToggle = (divId) => {
  const div = document.querySelector(divId);
  if(div.style.display === 'block') div.style.display = 'none';
  else div.style.display = 'block';
};

const addNewHottubModel = (model) => {
  const models = {model};
  fetch('/addEditCustomer/hottubModel', {
    method: 'POST',
    body: JSON.stringify(models),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => res.json())
  .then(({url}) => location.href = url);
};

const processClick = (target) => {
  if (target.matches('#addModelDivOpenBtn')) openDivToggle('#addModelDiv');
  if (target.matches('#editModelDivOpenBtn')) openDivToggle('#editModelDiv');
  if (target.matches('.modelEditIcon')) openDivToggle('#editModelInputDiv');
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
  if(target.matches('#addModelBtn')){
    const hottubModel = document.querySelector('#newModel').value;
    addNewHottubModel(hottubModel);
  };
  
  if(target.matches('#addModelBtn')) {
    const addDiv = document.querySelector('#addModelDiv');
    addDiv.style.display = 'none';
  }
  if(target.matches('#editModelBtn')) {
    const editDiv = document.querySelector('#editModelDiv');
    editDiv.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({
    target
  }) => processClick(target));
});