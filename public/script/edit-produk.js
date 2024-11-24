//below is function for deleting produk
let selectedProduk = ""

function deleteProduk(event){
    document.getElementById('catalog-modal').style.display = 'block';
    selectedProduk = event.target.id;
}

function closeWarningModal(){
    document.getElementById('catalog-modal').style.display = 'none';
}

function deleteProdukConfirmed(event){
    event.preventDefault();
    window.location.assign("http://localhost:" + window.location.port + "/delete-produk/" + selectedProduk);
}

//below is function for adding produk
function showAddProdukModal() {
    document.getElementById('add-catalog-modal').style.display = 'block';
}

function closeAddProdukModal(){
    document.getElementById('add-catalog-modal').style.display = 'none';
}