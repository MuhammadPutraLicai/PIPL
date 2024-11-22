function closeBookmark() {
    document.getElementById('bookmark-modal').style.display = 'none';
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    bookmarkItems.forEach(item => {
        item.remove();
    });
}

function createBookmarkItem(data){
    const bookmarkItem = document.createElement('div');
    bookmarkItem.className = 'bookmark-item';
    bookmarkItem.id = data.id;

    // Create bookmark-card-heading
    const cardHeading = document.createElement('div');
    cardHeading.className = 'bookmark-card-heading';

    // Create card-image
    const cardImage = document.createElement('div');
    cardImage.style.backgroundImage = `url(${data['link_logo']})`;
    cardImage.className = 'card-image';

    // Create card-info
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    // Company name
    const companyName = document.createElement('h4');
    companyName.className = 'nama-perusahaan league-spartan';
    companyName.textContent = data['nama_perusahaan'];

    // Company type
    const companyType = document.createElement('div');
    companyType.className = 'jenis-perusahaan league-spartan';
    companyType.innerHTML = `<span class="ic--baseline-category"></span>${data.jenis_perusahaan}`;

    // Product type
    const productType = document.createElement('div');
    productType.className = 'jenis-produk league-spartan';
    productType.innerHTML = `<span class="mdi--tag"></span>${data['jenis_produk']}`;

    // Create bookmark-card-content
    const cardContent = document.createElement('div');
    cardContent.className = 'bookmark-card-content';

    // Description
    const description = document.createElement('p');
    description.className = 'description libre-baskerville-regular';
    description.textContent = data['deskripsi'];

    // Button
    const button = document.createElement('button');
    button.className = 'league-spartan';
    button.id = data.id;
    button.textContent = 'Lihat Pemasok';
    //button.onclick = pemasokCardButtonClicked;

    // Assemble the structure
    cardInfo.append(companyName, companyType, productType);
    cardHeading.append(cardImage, cardInfo);
    cardContent.append(description, button);
    bookmarkItem.append(cardHeading, cardContent);

    // Add to bookmark-content div
    const bookmarkContent = document.getElementById('bookmark-content');
    bookmarkContent.appendChild(bookmarkItem);
}

function responseHandler(response){
    if (response) {
        for (let key in response){
            createBookmarkItem(response[key]);
        }
    }else{
        const bookmarkItem = document.createElement('h2');
        bookmarkItem.textContent = "Your Bookmarks is empty";
        bookmarkItem.className = 'bookmark-item';
        const bookmarkContent = document.getElementById('bookmark-content');
        bookmarkContent.appendChild(bookmarkItem);
    }
}

function showBookmark(){
    document.getElementById('bookmark-modal').style.display = 'block';
    const serverEndPoint = "http://localhost:" + window.location.port + "/bookmark/retrieve";
    const clientXhr = new XMLHttpRequest();
    clientXhr.open("GET", serverEndPoint);
    clientXhr.responseType = "json";
    clientXhr.send();
    clientXhr.onload = ()=>{
        let response = clientXhr.response;
        responseHandler(response);
    };
    
}
