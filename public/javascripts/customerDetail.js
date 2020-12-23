const processClick = (target) => {
  const {dataset: {id}} = target;
  if(target.matches('.fa-trash-alt')) location.href=`/customerList/data/delete/${id}`;
  if(target.matches('.fa-edit')) location.href=`/addEditCustomer/${id}`;
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({target}) => processClick(target));
});