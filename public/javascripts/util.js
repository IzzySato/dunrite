
const toggleOpenClose = (openCloseSection) => {
  openCloseSection.classList.toggle('show');
};

const processClick = (target) => {
  if(target.matches('.hamburgerMenu')){
    const nav = document.querySelectorAll('.nav');
    nav.forEach(n => toggleOpenClose(n));
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({target}) => processClick(target));
});