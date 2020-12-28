//display hottub brands intoHTML for Edit and remove
const hottubBrandTemplaet = ({_id, hottub: {brandName}}) => `
<li data-id=${_id}>${brandName}
  <i class="fas fa-edit modelEditIcon modelIcon"></i>
  <i data-id=${_id} class="fas fa-trash-alt removeBrandIcon modelIcon"></i>
</li>
`;
const insertBrandToHTML = () => {
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    const insertDiv = document.querySelector('#brandUl');
    const html = json.map((j) => hottubBrandTemplaet(j)).join('');
    insertDiv.innerHTML = html;
  })
};

//Edit or Remove hottub models insert all models into HTML
const insertModelToHTML = () => {
  const insertDiv = document.querySelector('#modelsUl');
  let html = '';
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    json.forEach((j) => {
      j.hottub.model.forEach((m) => {
        html += `
        <li>${j.hottub.brandName} : ${m}
          <i class="fas fa-edit modelEditIcon modelIcon"></i>
          <i class="fas fa-trash-alt modelRemoveIcon modelIcon"></i>
        </li>
      `;
      });
    });
    insertDiv.innerHTML = html;
  });
};

//GET hottub brand
const insertBrandOptionsHTML = () => {
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    const insertDiv = document.querySelectorAll('.brandSelect');
    insertDiv.forEach(d => {
       const html = json.map((d) => `<option value="${d.hottub.brandName}">${d.hottub.brandName}</option>`);
       d.innerHTML = '<option value="">Select a brand</option>' + html;
    }); 
  });
};

//POST add a new Brand into databse
const addBrand = (brandName) => {
  const brand = {brandName};
  fetch('/productConfig/addBrand', {
      method: 'POST',
      body: JSON.stringify(brand),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => location.href=url);
};

//POST add a new model into database
const addModel = (brandName, model) => {
  const newModel = {brandName, model};
  fetch('/productConfig/addModel', {
      method: 'POST',
      body: JSON.stringify(newModel),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => location.href=url);
};

const processClick = (target) => {
  if (target.matches('.removeBrandIcon')) {
    const {dataset: {id}} = target;
    location.href=`/productConfig/brandDelete/${id}`;
  };
  if(target.matches('#addBrandBtn')){
    const newBrand = document.querySelector('#newBrand').value;
    addBrand(newBrand);
  };
  if(target.matches('#addModelBtn')) {
    const brandName = document.querySelector('#brandNameSelect').value;
    const newModel = document.querySelector('#newModel').value;
    addModel(brandName, newModel);
  };
};

document.addEventListener('DOMContentLoaded', function () {
  insertBrandToHTML();
  insertModelToHTML();
  insertBrandOptionsHTML();
  document.addEventListener('click', ({
    target
  }) => processClick(target));
});

export{
  insertBrandOptionsHTML
};