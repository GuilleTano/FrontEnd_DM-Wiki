async function solicitarLista(){
    let expiraEn = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas en milisegundos

    await fetch("http://localhost:3000/digimon-list")
    .then(response => response.json())
    .then(data => {
        console.log("Lista recibida");
        let digimonList = JSON.stringify({ 
            nombres: data, 
            expiraEn: expiraEn 
        })
        localStorage.setItem("digimonList", digimonList);
        console.log("Lista guardada");
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", async function () {

    if (!localStorage.getItem('digimonList')) {
        solicitarLista();
    } 
    else {
        console.log("Ya existe la lista");
        const digimonList = JSON.parse(localStorage.getItem('digimonList'));
        
        if (new Date().getTime() > digimonList.expiraEn) {
            // Elimina los datos si la fecha de caducidad ha pasado
            localStorage.removeItem('digimonList');
            solicitarLista();
        }
    }
});
