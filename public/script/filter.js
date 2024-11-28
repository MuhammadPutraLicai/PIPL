function showFilterDropDown(){
    document.getElementById('filter-dropdown').style.display = 'block';
}
function closeFilterDropDown(){
    document.getElementById('filter-dropdown').style.display = 'none';
}

function createSupplierCard(data) {
    // Create the main container
    const supplierDiv = document.createElement('div');
    supplierDiv.className = 'supplier';
    supplierDiv.id = data.id;

    // Create card heading
    const cardHeadingDiv = document.createElement('div');
    cardHeadingDiv.className = 'card-heading';

    // Create card image
    const cardImageDiv = document.createElement('div');
    cardImageDiv.className = 'card-image';
    cardImageDiv.style.backgroundImage = `url(${data['linkLogo']})`;

    // Create card info
    const cardInfoDiv = document.createElement('div');
    cardInfoDiv.className = 'card-info';

    // Company name
    const companyNameH4 = document.createElement('h4');
    companyNameH4.className = 'nama-perusahaan league-spartan';
    companyNameH4.textContent = data['namaPerusahaan'];

    // Company type
    const companyTypeDiv = document.createElement('div');
    companyTypeDiv.className = 'jenis-perusahaan league-spartan';
    const companyTypeIcon = document.createElement('span');
    companyTypeIcon.className = 'ic--baseline-category';
    companyTypeDiv.appendChild(companyTypeIcon);
    companyTypeDiv.appendChild(document.createTextNode(` ${data['jenisPerusahaan']}`));

    // Product type
    const productTypeDiv = document.createElement('div');
    productTypeDiv.className = 'jenis-produk league-spartan';
    const productTypeIcon = document.createElement('span');
    productTypeIcon.className = 'mdi--tag';
    productTypeDiv.appendChild(productTypeIcon);
    productTypeDiv.appendChild(document.createTextNode(` ${data['jenisProduk']}`));

    // Card content
    const cardContentDiv = document.createElement('div');
    cardContentDiv.className = 'card-content';

    // Description
    const descriptionP = document.createElement('p');
    descriptionP.className = 'description libre-baskerville-regular';
    descriptionP.textContent = data['deskripsi'];

    // Button
    const button = document.createElement('button');
    button.className = 'league-spartan';
    button.id = data.id;
    button.textContent = 'Lihat Pemasok';
    button.setAttribute('onclick', 'pemasokCardButtonClicked()');

    // Assemble the structure
    cardInfoDiv.appendChild(companyNameH4);
    cardInfoDiv.appendChild(companyTypeDiv);
    cardInfoDiv.appendChild(productTypeDiv);

    cardHeadingDiv.appendChild(cardImageDiv);
    cardHeadingDiv.appendChild(cardInfoDiv);

    cardContentDiv.appendChild(descriptionP);
    cardContentDiv.appendChild(button);

    supplierDiv.appendChild(cardHeadingDiv);
    supplierDiv.appendChild(cardContentDiv);

    return supplierDiv;
}

function createFilteredSupplierCardList(data){
    const supplierList = document.querySelector('.supplier-list');
    const suppliers = document.querySelectorAll('.supplier-list .supplier');
    const supplierNotFound = document.getElementById('supplier-not-found');
    if(supplierNotFound){
        supplierNotFound.remove();
    }
    suppliers.forEach(supplier => supplier.remove());
    if(data){
       data.forEach(cardData => {
            let filteredCard = createSupplierCard(cardData);
            supplierList.appendChild(filteredCard)
        }); 
    }else{
        const notFoundElement = document.createElement('h3');
        notFoundElement.id = 'supplier-not-found';
        notFoundElement.textContent = 'Data tidak ditemukan';
        supplierList.appendChild(notFoundElement);
    }
}

function filterSupplier(){
    const selectedJenisPerusahaan = document.querySelector('input[name="jenis_perusahaan"]:checked');
    const selectedJenisProduk = document.querySelector('input[name="jenis_produk"]:checked');
    // Get the text of the parent label (which contains the company type)
    if (selectedJenisPerusahaan && selectedJenisProduk) {
        //get the selected value from radio button
        const jenisPerusahaan = selectedJenisPerusahaan.parentElement.textContent.trim();
        const jenisProduk = selectedJenisProduk.parentElement.textContent.trim();
        const data = JSON.stringify({
            jenis_perusahaan : jenisPerusahaan,
            jenis_produk : jenisProduk
        });
        //prevent the user from spamming the button
        const filterButton = document.getElementById('radio-button-selesai');
        filterButton.classList.add('disabled'); 
        filterButton.style.pointerEvents = 'none';

        //create an http request to the server
        serverEndPoint = "http://localhost:" + window.location.port + "/filter/filter-supplier";
        const clientXhr = new XMLHttpRequest();
        clientXhr.open("POST", serverEndPoint);
        clientXhr.responseType = "json";
        clientXhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        clientXhr.send(data);

        clientXhr.onload = ()=>{
            let response = clientXhr.response;
            createFilteredSupplierCardList(response.message);
            document.getElementById('filter-dropdown').style.display = 'none';
            filterButton.classList.remove('disabled');  // Remove disabled styling
            filterButton.style.pointerEvents = 'auto';
        };

    }else{
        window.alert("Tolong Pilih Jenis Perusahaan dan Jenis Produk")
    }
    
}