import * as ProductUtil from './productUtil.js';

const data = {};

const getData = () => new Promise((res, rej)=> {
  fetch('/productConfig/brand')
  .then(res => res.json())
  .then(json => {
    data.products = json;
    res();
  });
});

//html template used for addBrandHTML()
const hottubBrandTemplate = ({_id, hottub: {brandName}}) => `
<li data-id=${_id}>${brandName}
  <i data-name="${brandName}" class="fas fa-edit editBrandIcon modelIcon"></i>
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
const brandModelTemplate = (_id, brand, model) => `
<li>${brand} : ${model}
  <i data-id=${_id} data-name="${model}" class="fas fa-edit modelEditIcon modelIcon"></i>
  <i data-id=${_id} data-name="${model}" class="fas fa-trash-alt modelRemoveIcon modelIcon"></i>
</li>
`;

const addModelHTML = (data) => {
  const modelUl = document.querySelector('#modelsUl');
  let modelHTML = '';
  data.forEach((product) => {
    product.hottub.model.forEach((mo) => {
      modelHTML += brandModelTemplate(product._id, product.hottub.brandName, mo);
    });
  });
  modelUl.innerHTML = modelHTML;
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

const getBrandNameById = (id) => {
  const foundProduct = data.products.find(p => p._id === id);
  return foundProduct.hottub.brandName;
};

//POST remove model
const removeModel = (brandName, model) => {
  const product = {brandName, model};
  fetch('/productConfig/removeModel', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => location.href=url);
};

//Search brand or model function
const searchHottub = (searchVal) => {
  let hottubLi = '';
  data.products.forEach(product => {
    product.hottub.model.forEach(m =>{
      if(product.hottub.brandName === searchVal)
        hottubLi += brandModelTemplate(product._id, product.hottub.brandName, m);
      if(m === searchVal)
        hottubLi += brandModelTemplate(product._id, product.hottub.brandName, m);
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

const openEditForm = (target) => {
  const {dataset: {name}} = target;
  const editHottubDiv = document.querySelector('#editHottubDiv');
  const editInput = document.querySelector('#editInput');
  editHottubDiv.style.display='block';
  editInput.value=name;
};

const processClick = (target) => {
  if (target.matches('.removeBrandIcon')) {
    const {dataset: {id}} = target;
    location.href=`/productConfig/brandDelete/${id}`;
  };
  if(target.matches('.modelRemoveIcon')){
    const {dataset: {id}} = target;
    const {dataset: {name}} = target;
    const brandName = getBrandNameById(id);
    removeModel(brandName, name);
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
  if(target.matches('.editBrandIcon')){
    openEditForm(target);
  }
  if(target.matches('.modelEditIcon')){
    openEditForm(target);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  getData().then(()=>{
    const brandSelect = document.querySelector('#brandNameSelect');
    addBrandHTML(data.products);
    addModelHTML(data.products);
    ProductUtil.insertBrandOptionsHTML(brandSelect);
    document.addEventListener('click', ({
      target
    }) => processClick(target));
  });
});