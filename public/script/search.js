function createSearchedCard(data){
    const searchSupplierDiv = document.createElement('div');
    searchSupplierDiv.className = 'search-supplier';
    searchSupplierDiv.id = data.id;

    // Search Card Heading
    const searchCardHeadingDiv = document.createElement('div');
    searchCardHeadingDiv.className = 'search-card-heading';

    // Search Card Image
    const searchCardImageDiv = document.createElement('div');
    searchCardImageDiv.className = 'search-card-image';
    searchCardImageDiv.style.backgroundImage = `url('${data.linkLogo}')`;

    // Search Card Info
    const searchCardInfoDiv = document.createElement('div');
    searchCardInfoDiv.className = 'search-card-info';

    // Company Name
    const companyNameH4 = document.createElement('h4');
    companyNameH4.className = 'search-nama-perusahaan league-spartan';
    companyNameH4.textContent = data.namaPerusahaan;

    // Company Type
    const companyTypeDiv = document.createElement('div');
    companyTypeDiv.className = 'search-jenis-perusahaan league-spartan';
    const companyTypeSpan = document.createElement('span');
    companyTypeSpan.className = 'ic--baseline-category';
    companyTypeDiv.appendChild(companyTypeSpan);
    companyTypeDiv.appendChild(document.createTextNode(` ${data.jenisPerusahaan}`));

    // Product Type
    const productTypeDiv = document.createElement('div');
    productTypeDiv.className = 'search-jenis-produk league-spartan';
    const productTypeSpan = document.createElement('span');
    productTypeSpan.className = 'mdi--tag';
    productTypeDiv.appendChild(productTypeSpan);
    productTypeDiv.appendChild(document.createTextNode(` ${data.jenisProduk}`));

    // Search Card Content
    const searchCardContentDiv = document.createElement('div');
    searchCardContentDiv.className = 'search-card-content';

    // Description
    const descriptionP = document.createElement('p');
    descriptionP.className = 'search-description libre-baskerville-regular';
    descriptionP.textContent = data.deskripsi;

    // Button
    const button = document.createElement('button');
    button.className = 'league-spartan card-button';
    button.id = data.id;
    button.textContent = 'Lihat Pemasok';
    button.setAttribute('onclick', 'pemasokCardButtonClicked(event)');

    // Assemble the structure
    searchCardInfoDiv.appendChild(companyNameH4);
    searchCardInfoDiv.appendChild(companyTypeDiv);
    searchCardInfoDiv.appendChild(productTypeDiv);

    searchCardHeadingDiv.appendChild(searchCardImageDiv);
    searchCardHeadingDiv.appendChild(searchCardInfoDiv);

    searchCardContentDiv.appendChild(descriptionP);
    searchCardContentDiv.appendChild(button);

    searchSupplierDiv.appendChild(searchCardHeadingDiv);
    searchSupplierDiv.appendChild(searchCardContentDiv);

    return searchSupplierDiv;    
}

function createSearchedSupplierCardList(data){
    const supplierList = document.querySelector('.search-supplier-list');

    if(data){
       data.forEach(cardData => {
            let filteredCard = createSearchedCard(cardData);
            supplierList.appendChild(filteredCard)
        }); 
    }else{
        const notFoundElement = document.createElement('h3');
        notFoundElement.id = 'supplier-not-found';
        notFoundElement.textContent = 'Data tidak ditemukan';
        supplierList.appendChild(notFoundElement);
    }
}

function showSearchResult(){
    const searchInput = document.getElementById('search-input').value;
    if (!searchInput) {
        // Input is empty
        window.alert('Tolong Masukkan Input');
        return;
    }
    document.getElementById('search-modal').style.display = 'block';
    const supplierNotFound = document.getElementById('supplier-not-found');
    if(supplierNotFound){
        supplierNotFound.remove();
    }
    const suppliers = document.querySelectorAll('.search-supplier-list .search-supplier');
    if(suppliers){
        suppliers.forEach(supplier => supplier.remove()); 
    }
    
    document.getElementById('search-loader').style.display = 'block';
    
    //create a json that will be sent
    const data = JSON.stringify({name:searchInput});
    serverEndPoint = "http://localhost:" + window.location.port + "/search/search-nama-perusahaan";

    //make a request to the server
    const clientXhr = new XMLHttpRequest();
    clientXhr.open("POST", serverEndPoint);
    clientXhr.responseType = "json";
    clientXhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    clientXhr.send(data);
    clientXhr.onload = ()=>{
        let response = clientXhr.response;
        createSearchedSupplierCardList(response.message);
        document.getElementById('search-loader').style.display = 'none';
    };
}

function closeSearchResult(){
    document.getElementById('search-modal').style.display = 'none';
}