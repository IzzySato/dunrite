const openCloseWorkFormDiv = () => {
  const formDiv = document.querySelector('.workForm');
  if(formDiv.style.display === 'none'){
    formDiv.style.display = 'block';
  }else{
    formDiv.style.display = 'none';
  }
};

export {
  openCloseWorkFormDiv
}