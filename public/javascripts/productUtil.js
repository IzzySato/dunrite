let selectedBrand = '';

const insertBrands = (brandSelect, json) => {
  const html = json.map((product) => `<option value="${product.hottub.brandName}">${product.hottub.brandName}</option>`);
  brandSelect.innerHTML = '<option value="">Select a brand</option>' + html;
};

const insertModels = (brandSelect, modelSelect, json) => {
  if (modelSelect) {
    let html = '';
    selectedBrand = document.querySelector('#brandSelect').value;
    const { hottub: { model }} = json.find(({ hottub: { brandName } }) => brandName === selectedBrand);
    html += model.map(m => `<option value="${m}">${m}</option>`).join('');
    modelSelect.innerHTML = '<option value="">Select a brand</option>' + html;
  }
};

const brandModelForEditPage = (brandSelect, modelSelect, json, brand, model) => {
  let brandHTML = ''
  let modelHTML = '';
  json.map(product => {
    if(product.hottub.brandName == brand) {
      brandHTML += `<option selected="selected" value="${product.hottub.brandName}">${product.hottub.brandName}</option>`;
      product.hottub.model.map(m => {
        if(m === model) modelHTML += `<option selected="selected" value="${m}">${m}</option>`;
        else modelHTML += `<option value="${m}">${m}</option>`;
      });
    }
    else brandHTML += `<option value="${product.hottub.brandName}">${product.hottub.brandName}</option>`;
  });
  brandSelect.innerHTML = brandHTML;
  modelSelect.innerHTML = modelHTML;
};

//GET hottub brand options into select
const insertBrandOptionsHTML = (id, brandSelect, modelSelect, brand, model) => {
  fetch('/productConfig/brand')
    .then(res => res.json())
    .then(json => {
      brandSelect.addEventListener('change', () => {
        insertModels(brandSelect, modelSelect, json);
      });
      if(id === 'new'){
        insertBrands(brandSelect, json);    
      }else{
        brandModelForEditPage(brandSelect, modelSelect, json, brand, model);
      }
    });
};

export {
  insertBrandOptionsHTML
};