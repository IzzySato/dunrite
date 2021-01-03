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
  <i data-id=${_id}  data-name="${brandName}"  data-brand="${brandName}" data-model="" class="fas fa-edit editBrandIcon modelIcon"></i>
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
<li class="brandModelLi">${brand} : ${model}
  <i data-id=${_id} data-name="${model}" data-brand="${brand}" data-model="${model}"class="fas fa-edit modelEditIcon modelIcon"></i>
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

//POST add or edit brand (status is new or edit)
const addEditBrand = (status, brandName, newBrandName) => {
  const brand = {status, brandName, newBrandName};
  fetch('/productConfig/addEditBrand', {
      method: 'POST',
      body: JSON.stringify(brand),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(({url}) => location.href=url);
};

//POST add or edit model (status is new or edit)
const addEditModel = (status, brandName, model, newModel) => {
  console.log('addEditModel ' + newModel);
  const newOrEditModel = {status, brandName, model, newModel};
  fetch('/productConfig/addEditModel', {
      method: 'POST',
      body: JSON.stringify(newOrEditModel),
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
      if(product.hottub.brandName.toLowerCase() === searchVal.toLowerCase())
        hottubLi += brandModelTemplate(product._id, product.hottub.brandName, m);
      if(m.toLowerCase() === searchVal.toLowerCase())
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

const openEditForm = (target, openDiv, input) => {
  const {dataset: {name}} = target;
  openDiv.style.display='block';
  input.value = name;
};

const processClick = (target) => {
  if (target.matches('.removeBrandIcon')) {
    const {dataset: {id}} = target;
    location.href=`/productConfig/brandDelete/${id}`;
  }

  if(target.matches('.modelRemoveIcon')){
    const {dataset: {id}} = target;
    const {dataset: {name}} = target;
    const brandName = getBrandNameById(id);
    removeModel(brandName, name);
  }

  if(target.matches('#addBrandBtn')){
    const newBrandName = document.querySelector('#newBrand').value;
    const brand = '';
    const status = 'new';
    addEditBrand(status, brand, newBrandName);
  }

  if(target.matches('#addModelBtn')) {
    const brandName = document.querySelector('#brandNameSelect').value;
    const model = document.querySelector('#newModel').value;
    const status = 'new';
    const newVal = '';
    addEditModel(status, brandName, model, newVal);
  }

  if(target.matches('.editBrandIcon')) {
    const editHottubDiv = document.querySelector('#editHottubDiv');
    const editInput = document.querySelector('#editInput');
    editInput.dataset.brand = target.dataset.brand;
    openEditForm(target, editHottubDiv, editInput);
  }

  if(target.matches('.modelEditIcon')) {
    const editHottubDiv = document.querySelector('#editHottubDiv');
    const editInput = document.querySelector('#editInput');
    editInput.dataset.brand = target.dataset.brand;
    editInput.dataset.model = target.dataset.model;
    openEditForm(target, editHottubDiv, editInput);
  }
    //edit brandName or model
    if(target.matches('#editHottub')) {
      //the input is brandName or model
      const input = document.querySelector('#editInput');
      const newVal = document.querySelector('#editInput').value;
      const {dataset: {brand, model}} = input;
      const status = 'edit';
      console.log(`brand = ${brand} model = ${model} inputVal = ${newVal}`);

      //If data-model is empty === change brand
      if(model === ''){
        console.log('model is empty, change brand');
        addEditBrand(status, brand, newVal);
      }else{
        //change the model
        console.log('change model');
        addEditModel(status, brand, model, newVal);
      }
    }

  if(target.matches('#seachModelBtn')){
    const searchVal = document.querySelector('#seachModelInput').value;
    searchHottub(searchVal);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  getData().then(()=>{
    const brandSelect = document.querySelector('#brandNameSelect');
    addBrandHTML(data.products);
    addModelHTML(data.products);
    const id = 'new';
    ProductUtil.insertBrandOptionsHTML(id, brandSelect);
    document.addEventListener('click', ({
      target
    }) => processClick(target));
  });
});