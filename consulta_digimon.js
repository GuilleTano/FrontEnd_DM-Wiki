let buscador = "";
//let parametro = "";

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

/* FUNCION MOSTARAR CON SWITCH (NO FUNCIONA)
function parametroArray(parametro){

    switch (parametro){

        case parametro = "levels":
            return levels[i].level;
        break
        case parametro = "attributes":
            return attributes[i].attribute
        break
        case parametro = "types":
            return digimonData.types[i].type
        break
    }
    
}
function mostrarDigimon() {

    let cabCarta = `

        <div>${digimonData.id}</div>
        <div>${digimonData.name}</div>
        <hr>
        `;
    document.getElementById("cabecera-carta").innerHTML = cabCarta;

    let imgCarta = `
    <img src=${digimonData.images[0].href}>
    <hr>
    `;
    document.getElementById("imagen_carta").innerHTML = imgCarta;

    //------------------------------------------------------
    let digimon_tabla = [];
    for (let i = 0; i < digimonData.levels[i].length; i++) {
        
        digimon_tabla += `
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
                        <td> ${digimonData.levels[i].level}</td>
                        <td> ${digimonData.attributes[i].attribute}</td>
                        <td> ${digimonData.types[i].type}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div> ${digimonData.xAntibody}</div>
            `;
    }
    document.getElementById("datos-carta").innerHTML = digimon_tabla;

    document.getElementById("info-digimon").innerHTML = `
    <p>${digimonData.descriptions[0].description}</p>
    `;

}
*/

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
        }
        else {
            alert("Digi-error");
        }
    });
});
