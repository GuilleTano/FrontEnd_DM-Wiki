let buscador = "";

//ESTAS FUNCIONES MUESTRAN LOS DATOS EN LA CARTA
function mostrarLevels() {
    let arrayLevels = [];
    for (let i = 0; i < digimonData.levels.length; i++) {
        arrayLevels += `<div>${digimonData.levels[i].level}</div>`;
    }
    return arrayLevels;
}

function mostrarAtributos() {
    let arrayAtributos = [];
    for (let i = 0; i < digimonData.attributes.length; i++) {
        arrayAtributos += `<div>${digimonData.attributes[i].attribute}</div>`;
    }
    return arrayAtributos;
}

function mostrarTipos() {
    let arrayTipos = [];
    for (let i = 0; i < digimonData.types.length; i++) {
        arrayTipos += `<div>${digimonData.types[i].type}</div>`;
    }
    return arrayTipos;
}

function mostrarFields() {
    let fieldsID = [];
    for (let i = 0; i < digimonData.fields.length; i++) {
        let fieldID = 0;
        switch(digimonData.fields[i].id){
            case 1: fieldID ="images/NatureSpirits.png";
                break;
            case 2: fieldID ="images/VirusBusters.png";
                break;
            case 3: fieldID ="images/WindGuardians.png";
                break;
            case 4: fieldID ="images/Unknown.png";
                break;
            case 5: fieldID ="images/MetalEmpire.png";
                break;
            case 6: fieldID ="images/DeepSavers.png";
                break;
            case 7: fieldID ="images/DarkArea.png";
                break;
            case 8: fieldID ="images/NightmareSoldiers.png";
                break;
            case 9: fieldID ="images/DragonsRoar.png";
                break;
            case 10: fieldID ="images/JungleTroopers.png";
                break;
        }
        fieldsID += `<td><img src="${fieldID}" alt="${digimonData.fields[i].field}"></td>`;
    }
    return fieldsID;
}

//FILTRA LAS DESCRIPCIONES PARA MOSTRAR LA QUE ESTA EN INGLES
function mostrarDescripcion() {
    let descripcion = [];
    for (let i = 0; i < digimonData.descriptions.length; i++) {
        if (digimonData.descriptions[i].language == "en_us") {
            descripcion += `<p>${digimonData.descriptions[i].description}</p>`;
        }
    }
    return descripcion;
}

//FUNCION PARA MOSTRAR LAS SKILLS
function mostrarHabilidades() {
    let habilidades = [];
    for (let i = 0; i < digimonData.skills.length; i++) {
        if (digimonData.skills[i].translation == "") {
            habilidades += `
                <tr>
                    <td class="skill-table-td">${digimonData.skills[i].skill}</td>
                    <td class="skill-table-td">${digimonData.skills[i].description}</td>
                </tr>
            `;
        }
        else{
            habilidades += `
                <tr>
                    <td class="skill-table-td">${digimonData.skills[i].skill} / ${digimonData.skills[i].translation}</td>
                    <td class="skill-table-td">${digimonData.skills[i].description}</td>
                </tr>
            `;
        }
    }
    document.getElementById("skill-digimon").innerHTML = habilidades;

}

//FUNCIONES PARA MOSTRAR LA LINEA EVOLUTIVA
function mostrarPreEvoluciones() {
    let arrayPreEvos = [];
    for (let i = 0; i < digimonData.priorEvolutions.length; i++) {
        arrayPreEvos += `<li>${digimonData.priorEvolutions[i].digimon}</li>`;
    }
    return arrayPreEvos;
}
function mostrarEvoluciones() {
    let arrayEvos = [];
    for (let i = 0; i < digimonData.nextEvolutions.length; i++) {
        arrayEvos += `<li>${digimonData.nextEvolutions[i].digimon}</li>`;
    }
    return arrayEvos;
}


// FUNCION MOSTRAR - MUESTRA LA CARTA DEL DIGIMON Y LA DESCRIPCION
function mostrarDigimon() {
    //Cabecera carta
    let addHeadCard = `
    <div><p style="margin:5px"><b><small>${digimonData.id}</small></b><br><strong>${digimonData.name}</strong></p></div>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    //Imagen carta
    document.getElementById("image-card").innerHTML = `<img src=${digimonData.images[0].href}>`;

    //Tabla 1
    let attTable = `
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
            <td>${mostrarAtributos()}</td>
            <td>${mostrarTipos()}</td>
        </tr>
    </tbody>`;
    document.getElementById("att-table").innerHTML = attTable;

    //Tabla 2
    let fieldsTable =`
    <tbody>
        <tr>
            ${mostrarFields()}
        </tr>
    </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    //xAntibody
    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${digimonData.xAntibody}</p>`;

    //MUESTRA LA DESCRIPCION DEL DIGIMON 
    document.getElementById("info-digimon").innerHTML = `<p>${mostrarDescripcion()}</p>`;


    //Pre Evo
    document.getElementById("pre-evoluciones").innerHTML = mostrarPreEvoluciones();

    //Evo
    document.getElementById("evoluciones").innerHTML = mostrarEvoluciones();

}

document.getElementById("btnBuscar").addEventListener("click", function () {

    buscador = document.getElementById("buscador").value;

    getJSONData(DIGIMON_URL + buscador).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });
});






//**************************** BOTONES DE PRUEBAS ****************************
document.getElementById("btnPruebas").addEventListener("click", function(){
    getJSONData(DIGIMON_URL + "beelzebumon").then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });       
});
document.getElementById("btnPruebas2").addEventListener("click", function(){
    getJSONData(DIGIMON_URL + "tailmon").then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });       
});
document.getElementById("btnPruebas3").addEventListener("click", function(){
    getJSONData(DIGIMON_URL + "agumon").then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });

});