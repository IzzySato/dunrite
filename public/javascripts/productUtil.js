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

          html += model.map(m => `<option value="${m}">${m}</option>`)
                        .join('');

      modelSelect.innerHTML = '<option value="">Select a brand</option>' + html;
  }
};

//GET hottub brand options into select
const insertBrandOptionsHTML = (brandSelect, modelSelect) => {
  fetch('/productConfig/brand')
    .then(res => res.json())
    .then(json => {
       brandSelect.addEventListener('change', () => {
        insertModels(brandSelect, modelSelect, json);
      });
      insertBrands(brandSelect, json);      
    });
};

export {
  insertBrandOptionsHTML
};