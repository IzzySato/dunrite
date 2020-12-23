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
      <i class="fas fa-edit customerPageIcon" data-id="${_id}"></i>
      <i class="fas fa-trash-alt customerPageIcon" data-id="${_id}"></i>
      <a class="detailBtn" href="customerDetail/${_id}" data-id="${_id}">Details</a>
    </div>
  </li>
</ul>`;

const processClick = (target) => {
  const {dataset: {id}} = target;
  if(target.matches('.fa-trash-alt')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.fa-edit')) location.href=`/addEditCustomer/${id}`;
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