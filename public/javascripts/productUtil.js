let selectedBrand = '';

const insertBrands = (json) => {
  const brandSelect = document.querySelectorAll('.brandSelect');
  brandSelect.forEach(data => {
    const html = json.map((product) => `<option value="${product.hottub.brandName}">${product.hottub.brandName}</option>`);
    data.innerHTML = '<option value="">Select a brand</option>' + html;
  });
};

const insertModels = (json) => {
  const modelSelect = document.querySelector('#modelSelect');
  const brandSelect = document.querySelector('#brandSelect');
  if (modelSelect) {
    brandSelect.addEventListener('change', function () {
      let html = '';
      selectedBrand = document.querySelector('#brandSelect').value;
      json.forEach((product) => {
        if (product.hottub.brandName === selectedBrand) {
          product.hottub.model.forEach((m) => {
            html += `<option value="${m}">${m}</option>`
          });
        }
      });
      modelSelect.innerHTML = '<option value="">Select a brand</option>' + html;
    });
  }
};

//GET hottub brand options into select
const insertBrandOptionsHTML = () => {
  fetch('/productConfig/brand')
    .then(res => res.json())
    .then(json => {
      insertBrands(json);
      insertModels(json);
    });
};

export {
  insertBrandOptionsHTML
};