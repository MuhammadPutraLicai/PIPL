function closeModal() {
    document.getElementById('modal-id').style.display = 'none';
}

function openModal() {
    const pemasok = document.getElementsByClassName('page-title');
    const id = pemasok[0].id;
    let notificationText = document.getElementById('success-text');
    const serverEndPoint = "http://localhost:" + window.location.port + "/bookmark/add";
    let data = JSON.stringify({pemasokId : id});

    try {
        const clientXhr = new XMLHttpRequest();
        clientXhr.open("POST", serverEndPoint);
        clientXhr.responseType = "json";
        clientXhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        clientXhr.send(data);

        clientXhr.onload = ()=>{
            let response = clientXhr.response;
            notificationText.innerHTML = response.message;
            document.getElementById('modal-id').style.display = 'block';
        };
    } catch (error) {
        console.log(error);
    }
    
}