const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', (event)=>{
    event.preventDefault();
    const formDestination = document.getElementById('form-fields').action;
    const clientEmail = document.getElementById('username').value;
    const kataSandi = document.getElementById('password').value;
    /*console.log(username);
    console.log(password);
    console.log(formDestination);*/

    const xhrClient = new XMLHttpRequest();

    let formData = JSON.stringify({
        email : clientEmail,
        password : kataSandi
    });

    xhrClient.open("POST", formDestination);
    xhrClient.responseType = "json";
    xhrClient.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhrClient.send(formData);

    xhrClient.onload = ()=>{
        if(xhrClient.status != 200){
            alert('Error: ' + xhrClient.status);
            return;
        }
        let response = xhrClient.response;
        window.location.assign('http://localhost:' + window.location.port + '/main-'+ response.role);
    };
});