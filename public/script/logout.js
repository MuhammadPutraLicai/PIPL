const logout = document.getElementById('logout');
logout.addEventListener('click',()=>{
    const port = window.location.port;
    window.location.assign("http://localhost:" + port + "/logout");
})

function showProfil(){
    const port = window.location.port;
    window.location.assign("http://localhost:" + port + "/profil");
}