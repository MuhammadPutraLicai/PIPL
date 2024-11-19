const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', (event)=>{
    event.preventDefault();
    const formDestination = document.getElementById('form-fields').action;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    console.log(formDestination);
    }
);