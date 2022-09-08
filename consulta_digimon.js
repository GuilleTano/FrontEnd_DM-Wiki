let buscador = "";

function mostrarDigimon() {

    let addDigimon = `

        <div>${digimonData.id}</div><br>
        <img src=${digimonData.images[0].href}>
        <div>${digimonData.name}</div><br>
        <div>${digimonData.attributes[0].attribute}</div><br>
        <div>${digimonData.levels[0].level}</div><br>
        <div>${digimonData.types[0].type}</div><br>
        <div>${digimonData.xAntibody}</div><br>
        `;

    document.getElementById("mostrar-digimon").innerHTML = addDigimon;

}
/*
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(DIGIMON_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });
*/

document.getElementById("btnBuscar").addEventListener("click", function () {

    buscador = document.getElementById("buscador").value;


    getJSONData(DIGIMON_URL + buscador).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });


});
