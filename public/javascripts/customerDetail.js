const processClick = (target) => {
  const {dataset: {id}} = target;
  if(target.matches('.removeCustomer')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.editCustomer')) location.href=`/addEditCustomer/${id}`;
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({target}) => processClick(target));
});