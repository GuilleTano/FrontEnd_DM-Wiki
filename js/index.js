document.addEventListener("DOMContentLoaded", async function () {

    await fetch("http://localhost:3000/digimon-list")
    .then(response => response.json())
    .then(data => {

        console.log("Lista recibida");
        let listaNombres = JSON.stringify(data);

        localStorage.setItem("listaNombres", listaNombres);
    })
    .catch(error => console.error(error));

});

