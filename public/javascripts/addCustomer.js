const addCustomer = (
  customerFirstName,
  customerLastName,
  phone,
  email,
  street,
  city,
  postcode,
  country = 'Canada',
  date = '',
  work = '',
  comments = '') => {
    const newCustomer = {
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
    };

    fetch('/addCustomer', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({
      url
    }) => location.href = url);
};

document.addEventListener('DOMContentLoaded', function () {
  const addCustomerButton = document.querySelector('#newCustomerButton');

  if(addCustomerButton){
    addCustomerButton.addEventListener('click', () => {
      const customerFirstName = document.querySelector('#customerFirstName').value;
      const customerLastName = document.querySelector('#customerLastName').value;
      const phone = document.querySelector('#phone').value;
      const email = document.querySelector('#email').value;
      const street = document.querySelector('#street').value;
      const city = document.querySelector('#city').value;
      const postcode = document.querySelector('#postcode').value;
      const country = document.querySelector('#country').value;
      const date = document.querySelector('#date').value;
      const work = document.querySelector('#work').value;
      const comments = document.querySelector('#comments').value;

      addCustomer(
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
        );
    });
  };
});
