let buscador = "";

function mostrarDigimon() {

    let addDigimon = `

        <div>${digimonData.id}</div>
        <hr>
        <img src=${digimonData.images[0].href}>
        <hr>
        <div>${digimonData.name}</div><br>
        <div>${digimonData.attributes[0].attribute}</div><br>
        <div>${digimonData.levels[0].level}</div><br>
        <div>${digimonData.types[0].type}</div><br>
        <div>${digimonData.xAntibody}</div><br>
        `;

    document.getElementById("mostrar-digimon").innerHTML = addDigimon;

    document.getElementById("info-digimon").innerHTML = `
    <p>${digimonData.descriptions[0].description}</p>
    `;

}

function digimonSkills(){
    let digimon_skills = [];

    for (let i=0; i < digimonData.skills.length; i++){
        
        digimon_skills += `
        <p>${digimonData.skills[i].skill}</p>
        `;
    }
    console.log(digimon_skills);
    document.getElementById("skill-digimon").innerHTML = digimon_skills;
}

document.getElementById("btnBuscar").addEventListener("click", function () {

    buscador = document.getElementById("buscador").value;


    getJSONData(DIGIMON_URL + buscador).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            digimonSkills(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });


});
