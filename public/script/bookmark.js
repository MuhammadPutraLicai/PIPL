function closeBookmark() {
    document.getElementById('bookmark-modal').style.display = 'none';
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    bookmarkItems.forEach(item => {
        item.remove();
    });
}

function removeBookmark(event){//trigerred when user hit the x button on the top left
    const clickedElement = event.target;
    clickedElement.parentElement.remove();
    //get pemasok id
    const clickedElementId = clickedElement.id;

    //send it to server so that it could be deleted from database
    const serverEndPoint = "http://localhost:" + window.location.port + "/bookmark/delete";
    const data = JSON.stringify({pemasokId : clickedElementId});

    const clientXhr = new XMLHttpRequest();
    clientXhr.open("DELETE", serverEndPoint);
    clientXhr.responseType = "json";
    clientXhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    clientXhr.send(data);
    clientXhr.onload = ()=>{
        let response = clientXhr.response;
        console.log(response);
    };
}

function seePemasokPage(event){//trigerred when user click 'lihat pemasok' button
    const pemasokId = event.target.id;
    window.location.assign('http://localhost:'+ window.location.port + '/profil-pemasok/' + pemasokId);
}

function createBookmarkItem(data){
    const bookmarkItem = document.createElement('div');
    bookmarkItem.className = 'bookmark-item';
    bookmarkItem.id = "#";

    //create remove button
    const span = document.createElement('span');
    span.className = 'remove-bookmark';
    span.id = data.id;
    span.innerHTML = '&times;';
    span.onclick = (event) => removeBookmark(event);

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
    button.onclick = (event) => seePemasokPage(event);
    //button.onclick = pemasokCardButtonClicked;

    // Assemble the structure
    cardInfo.append(companyName, companyType, productType);
    cardHeading.append(cardImage, cardInfo);
    cardContent.append(description, button);
    bookmarkItem.append(span,cardHeading, cardContent);

    // Add to bookmark-content div
    const bookmarkContent = document.getElementById('bookmark-content');
    bookmarkContent.appendChild(bookmarkItem);
}

function responseHandler(response){
    if (Object.values(response).length){
        const loaderElement = document.getElementById('bookmark-loader');
        loaderElement.style.display = 'none';
        for (let key in response){
            createBookmarkItem(response[key]);
        }
    }else{
        const loaderElement = document.getElementById('bookmark-loader');
        loaderElement.style.display = 'none';
        const bookmarkItem = document.createElement('h2');
        bookmarkItem.textContent = "Your Bookmarks is empty";
        bookmarkItem.style.textAlign = "center";
        bookmarkItem.className = 'bookmark-item';
        const bookmarkContent = document.getElementById('bookmark-content');
        bookmarkContent.appendChild(bookmarkItem);
    }
}

function showBookmark(){
    const loaderElement = document.getElementById('bookmark-loader');
    loaderElement.style.display = 'block';
    document.getElementById('bookmark-modal').style.display = 'block';
    //preventing the user from spanning the bookmark button
    const bookmarkButton = document.getElementById('bookmark-button');
    bookmarkButton.classList.add('disabled');  // Add disabled styling
    bookmarkButton.style.pointerEvents = 'none';

    const serverEndPoint = "http://localhost:" + window.location.port + "/bookmark/retrieve";
    const clientXhr = new XMLHttpRequest();
    clientXhr.open("GET", serverEndPoint);
    clientXhr.responseType = "json";
    clientXhr.send();
    clientXhr.onload = ()=>{
        let response = clientXhr.response;
        responseHandler(response);
        bookmarkButton.classList.remove('disabled');  // Remove disabled styling
        bookmarkButton.style.pointerEvents = 'auto';  // Re-enable clicks
    };
    
}
