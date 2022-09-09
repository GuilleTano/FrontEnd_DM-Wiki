let buscador = "";

function mostrarLevels(){
    let arrayLevels = [];
    for (let i=0; i < digimonData.levels.length; i++){
        
        arrayLevels += `<p>${digimonData.levels[i].level}</p>`
        
    }
    return arrayLevels;
}

// FUNCION MOSTRAR - MUESTRA LA CARTA DEL DIGIMON Y LA DESCRIPCION
function mostrarDigimon() {

    let addDigimon = `

        <div><p style="margin:5px">${digimonData.id}<br><strong>${digimonData.name}</strong></p></div>
        <hr style="margin:2px">
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
            <td>${mostrarLevels()}</td>
            <td> ${digimonData.attributes[0].attribute}</td>
            <td> ${digimonData.types[0].type}</td>
        </tr>
        </tbody>
    </table>
        <hr>
        <div> ${digimonData.xAntibody}</div>
        `;
    
    document.getElementById("mostrar-digimon").innerHTML = addDigimon;

    //MUESTRA LA DESCRIPCION DEL DIGIMON 
    document.getElementById("info-digimon").innerHTML = `
    <p>${digimonData.descriptions[0].description}</p>
    `;

}

//FUNCION PARA MOSTRAR LAS SKILLS
function digimonSkills(){
    let digimon_skills = [];

    for (let i=0; i < digimonData.skills.length; i++){
        
        digimon_skills += `
        <p><strong>${digimonData.skills[i].skill}/ ${digimonData.skills[i].translation}</strong></p>
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
            mostrarLevels(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });
});
