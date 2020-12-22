const customerDetailTemplate = ({
  _id,
  customerFirstName,
  customerLastName,
  phone,
  email,
  street,
  city,
  postcode,
  country,
  date,
  work,
  comments
}) =>`
  <h3>CustomerID: ${_id}</h3>
  <h3>First Name: ${customerFirstName}</h3> 
  <h3>Last Name: ${customerLastName}</h3>
  <h3>Phone Number: ${phone}</h3>
  <h3>email: ${email}</h3>
  <h3>Street: ${street}</h3>
  <h3>City: ${city}</h3>
  <h3>Postcode: ${postcode}</h3>
  <h3>Country: ${country}</h3>
  <h3>Last Visited Date: ${date}</h3>
  <h3>Last Visited work: ${work}</h3>
  <h3>Comments: ${comments}</h3>
`;

const selectedCustomerData = (id) => {
  fetch(`/customerDetail/data/${id}`)
  .then(res => res.json())
  .then(data => {
    const div = document.querySelector('#detailDiv');
    console.log(data);
    console.log();
    div.innerHTML = customerDetailTemplate(data[0]);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  const {dataset: {id}} = document.querySelector('#detailDiv');

  selectedCustomerData(id);
});