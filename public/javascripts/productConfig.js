import * as ProductUtil from './productUtil.js';

//html template used for addBrandHTML()
const hottubBrandTemplate = ({_id, hottub: {brandName}}) => `
<li data-id=${_id}>${brandName}
  <i class="fas fa-edit editBrandIcon modelIcon"></i>
  <i data-id=${_id} class="fas fa-trash-alt removeBrandIcon modelIcon"></i>
</li>
`;

const addBrandHTML = (data) => {
  const brandUl = document.querySelector('#brandUl');
  if(brandUl){
    const brandHTML = data.map((product) => hottubBrandTemplate(product)).join('');
    brandUl.innerHTML = brandHTML;
  }
};

//brand/model list template
const brandModelTemplate = (brand, model) => `
<li>${brand} : ${model}
  <i class="fas fa-edit modelEditIcon modelIcon"></i>
  <i class="fas fa-trash-alt modelRemoveIcon modelIcon"></i>
</li>
`;

const addModelHTML = (data) => {
  const modelUl = document.querySelector('#modelsUl');
  let modelHTML = '';
  data.forEach((product) => {
    product.hottub.model.forEach((mo) => {
      modelHTML += brandModelTemplate(product.hottub.brandName, mo);
    });
  });
  modelUl.innerHTML = modelHTML;
};

//GET hottub models insert all models into HTML (Edit or Remove section)
const insertModelToHTML = () => {
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    addBrandHTML(json);
    addModelHTML(json);
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

const searchHottub = (searchVal) => {
  let hottubLi = '';
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    json.forEach((product) => {
      product.hottub.model.forEach((m) => {
        if(product.hottub.brandName === searchVal){
          hottubLi += brandModelTemplate(product.hottub.brandName, m);
        };
        if(m === searchVal){
          hottubLi += brandModelTemplate(product.hottub.brandName, m);
        };
      });
    });

    if(hottubLi === ''){
      const noFoundModelDiv = document.querySelector('#noFoundModel');
      noFoundModelDiv.style.display='block';
    }else{
      const foundModelUl = document.querySelector('#foundModels');
      foundModelUl.style.display='block';
      foundModelUl.innerHTML=hottubLi;
    }
  });
};

const processClick = (target) => {
  if (target.matches('.removeBrandIcon')) {
    const {dataset: {id}} = target;
    location.href=`/productConfig/brandDelete/${id}`;
  };
  if(target.matches('.modelRemoveIcon')){
    //TODO
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
  if(target.matches('#seachModelBtn')){
    const searchVal = document.querySelector('#seachModelInput').value;
    searchHottub(searchVal);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  insertModelToHTML();
  ProductUtil.insertBrandOptionsHTML();
  document.addEventListener('click', ({
    target
  }) => processClick(target));
});