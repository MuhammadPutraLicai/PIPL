function pemasokCardButtonClicked(event) {
    // Get the button element that was clicked
    const button = event.target;
    // Retrieve the id attribute
    const pemasokId = button.id;
    // Log the id to the console (you can modify this to do whatever you need with the ID)
    window.open("http://localhost:" + window.location.port + "/profil-pemasok/" + pemasokId, "_blank");
}

