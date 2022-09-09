let buscador = "";

function mostrarDigimon() {

    let addDigimon = `

        <div>${digimonData.id}</div>
        <div>${digimonData.name}</div>
        <hr>
        <img src=${digimonData.images[0].href}>
        <hr>
        <table>
        <thead>
            <tr>
                <th>Level</th>
                <th>Attribute</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td> ${digimonData.levels[0].level}</td>
            <td> ${digimonData.attributes[0].attribute}</td>
            <td> ${digimonData.types[0].type}</td>
        </tr>
        </tbody>
    </table>
        <hr>
        <div> ${digimonData.xAntibody}</div>
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
        <p>${digimonData.skills[i].skill}/ ${digimonData.skills[i].translation} </p>
        <p>${digimonData.skills[i].description}</p>
        <hr>
        `;
    }
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
