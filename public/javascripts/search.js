const getSuccessDiv = () => {
  return document.querySelector('.foundDiv');
};

const getErrorDiv = () => {
  return document.querySelector('.noFoundDiv');
};

const getFoundSection = () => {
  return document.querySelector('.foundSection');
}

const openSuccessOrErrorDiv = (found, html, foundSection = '', successDiv = '', errorDiv = '') => {
  if( foundSection === '') foundSection = getFoundSection();
  if( successDiv === '') successDiv = getSuccessDiv();
  if( errorDiv === '') errorDiv = getErrorDiv();

  foundSection.style.display='block';

  if(found){
    errorDiv.style.display='none';
    successDiv.style.display='block';
    successDiv.innerHTML=html;
  }else{
    successDiv.style.display = 'none';
    errorDiv.style.display='block';
  }
}

const searchHottub = (searchVal, data, template, foundSection, successDiv, errorDiv) => {
  const seachValLoercase = searchVal.toLowerCase();
  let html = '';
  let found = false;
  data.products.forEach(product => {
    product.hottub.model.forEach(m =>{
      if(m.toLowerCase() === seachValLoercase || 
        product.hottub.brandName.toLowerCase() === seachValLoercase){
          html += template(product._id, product.hottub.brandName, m);
          found = true;
      }
    });
  });
  openSuccessOrErrorDiv(found, html, foundSection, successDiv, errorDiv);
};

const searchCustomer = ( searchVal, data, template , foundSection, successDiv, errorDiv) => {
  const seachValLoercase = searchVal.toLowerCase();
  let html = '';
  let found = false;
  data.customers.forEach(customer => {
    if(customer.customerFirstName.toLowerCase() === seachValLoercase || 
      customer.customerLastName.toLowerCase() === seachValLoercase || 
      customer.phone === searchVal){
        html += template(customer);
        found = true;
      }
  });
  openSuccessOrErrorDiv(found, html, foundSection, successDiv, errorDiv);
};

const keyUpSearch = (input, func, data, template, successDiv, errorDiv) => {
  input.addEventListener('keyup', (event) => {
    if(event.keyCode === 13) {
      func(input.value, data, template, successDiv, errorDiv);
    }
  });
}

export {
  keyUpSearch,
  searchHottub,
  searchCustomer
}