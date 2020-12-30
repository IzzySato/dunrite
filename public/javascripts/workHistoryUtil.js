const openCloseWorkFormDiv = () => {
  const formDiv = document.querySelector('.workForm');
  if(formDiv.style.display === 'none'){
    formDiv.style.display = 'block';
  }else{
    formDiv.style.display = 'none';
  }
};

const addWork = (customerId, date, service) => {
  const work = {
    customerId, 
    date, 
    service
  };
  fetch('/addEditCustomer/addWork', {
      method: 'POST',
      body: JSON.stringify(work),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({
      url
    }) => location.href = url);
};

export {
  openCloseWorkFormDiv,
  addWork
}