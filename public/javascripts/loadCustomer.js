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
  <a href="customerDetail/${_id}"><li class="data customerLi" data-id="${_id}">${_id}</li></a>
  <li class="data">${customerFirstName} ${customerLastName}</li>
  <li class="data">${email}</li>
  <li class="data">${phone}</li>
  <li class="data">${street} ${city} ${postcode} ${country}</li>
  <li class="data">
    <div>
      <i class="fas fa-edit customerPageIcon"></i>
      <i class="fas fa-trash-alt customerPageIcon"></i>
      <i class="fas fa-star customerPageIcon"></i>
    </div>
  </li>
</ul>`;

const loadCustomer = () => {
  fetch('/customerList/data')
  .then(res => res.json())
  .then(data => {
    const html = data.map(person => customerTemplate(person)).join('');
    const div = document.querySelector('#dataDiv');
    div.innerHTML = html;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  loadCustomer();
});