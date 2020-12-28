const insertBrands = (json) => {
    const brandSelect = document.querySelectorAll('.brandSelect');
    brandSelect.forEach(data => {
       const html = json.map((product) => `<option value="${product.hottub.brandName}">${product.hottub.brandName}</option>`);
       data.innerHTML = '<option value="">Select a brand</option>' + html;
    });
};

//TODO insert models from the selected brand
const insertModels = (json) => {
  const modelSelect = document.querySelector('#modelSelect');
  if(modelSelect){
    const html = json.map((product) => {
      console.log(product.hottub.model);
    });
    //`<option value="${m}">${m}</option>`
    console.log(html);
    modelSelect.innerHTML = '<option value="">Select a brand</option>' + html;
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

export{
  insertBrandOptionsHTML
};