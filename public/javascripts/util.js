const toggleOpenClose = (openCloseSection) => {
  openCloseSection.classList.toggle('show');
};

const confirmMessage = (insertDiv) => {
  const html = `
  <div id="confirmMessageDiv" class="confirmMessageDiv messageDiv">
    <div class="confirmTextSection">
      <h2 class="sectionTitle confirmH2">Are you sure?</h2>
    </div>
    <div class="confirmBtnSection">
      <button class="confirmedBtn smallBtnOne">YES</button>
      <button data-div="confirmMessageDiv" class="cancelEdit smallBtnOne confirmedBtn">CANCEL</button>
    </div>
  </div>
  `
  insertDiv.innerHTML = html;
}

const insertMessage = (insertDiv, isError, message) => {
  const messageP = `<p class="messageText">${message}</p>`;

  const success = {
    title: 'Success!',
    css: 'success',
    icon: 'far fa-check-circle',
    btnCSS: 'successBtn'
  };

  const error = {
    title: 'Error!',
    css: 'error',
    icon: 'fas fa-exclamation-circle',
    btnCSS: 'errorBtn'
  };

  const result = (isError)? error : success;

  let html = `
  <div id="msgDiv" class="message">
    <div class="${result.css} messageIconDiv">
      <i class="${result.icon} messageIcon"></i>
    </div>
    <div class="messageArea">
      <h2>${result.title}</h2>
      ${messageP}
      <button data-div="msgDiv" class="smallBtnOne btnMessage ${result.btnCSS} ${result.css}">OK</button>
    </div>
  </div>
  `;
  insertDiv.innerHTML=html;
}

const clearInputValue = (input) => {
  input.value = '';
}

const clearAllInput = (inputClasses) => {
  inputClasses.forEach(input => {
    clearInputValue(input)
  });
}

const processClick = (target) => {
  if(target.matches('.hamburgerMenu')){
    const nav = document.querySelectorAll('.nav');
    nav.forEach(n => toggleOpenClose(n));
  }
  if(target.matches('.clearInputVal')){
    const {dataset: {name}} = target;
    const input = document.querySelector(`#${name}`);
    clearInputValue(input);
  }

  if(target.matches('.clearAllInput')){
    const inputClasses = document.querySelectorAll('.inputs');
    clearAllInput(inputClasses);
  }

  if(target.matches('.removeCustomer')) {
    const {dataset:{id}} = target;
    const messageDiv = document.querySelector('.messageDiv');
    confirmMessage(messageDiv);
    const confirmedBtn = document.querySelector('.confirmedBtn');
    confirmedBtn.addEventListener('click', () => {
      insertMessage(messageDiv, false, 'Removed the Customer');
      const btn = document.querySelector('.btnMessage');
      btn.addEventListener('click', () => {
        location.href=`/customerList/data/delete/${id}`;
      });
    });
  }

  //close the parent div once clicked cancel
  const {dataset: {div}} = target;
  const closeDiv = document.querySelector(`#${div}`);

  if(target.matches('.errorBtn') || target.matches('.cancelEdit')){
    closeDiv.style.display='none';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', ({target}) => processClick(target));
  document.addEventListener('touch', ({target}) => processClick(target));
});

export{
  insertMessage
}
