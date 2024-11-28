function showInformasiContact(event) {
    const selectedInformasi = event.target.id;
    document.getElementById('informasi-contact-content').innerHTML = selectedInformasi;
    document.getElementById('informasi-contact-modal').style.display = 'flex';
}

function closeInformasiContact(){
    document.getElementById('informasi-contact-content').innerHTML = "none";
    document.getElementById('informasi-contact-modal').style.display = 'none';
}