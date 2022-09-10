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
    let arrayFields = [];
    for (let i = 0; i < digimonData.fields.length; i++) {
        arrayFields += `<td class="tdFields">${digimonData.fields[i].field}</td>`;
    }
    return arrayFields;
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

// FUNCION MOSTRAR - MUESTRA LA CARTA DEL DIGIMON Y LA DESCRIPCION
function mostrarDigimon() {
    let addHeadCard = `
    <div><p style="margin:5px"><b><small>${digimonData.id}</small></b><br><strong>${digimonData.name}</strong></p></div>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    document.getElementById("image-card").innerHTML = `<img src=${digimonData.images[0].href}>`;

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

    let fieldsTable =`
    <tbody>
        <tr>
            ${mostrarFields()}
        </tr>
    </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${digimonData.xAntibody}</p>`;

    //MUESTRA LA DESCRIPCION DEL DIGIMON 
    document.getElementById("info-digimon").innerHTML = `${mostrarDescripcion()}`;
}

document.getElementById("btnBuscar").addEventListener("click", function () {

    buscador = document.getElementById("buscador").value;

    getJSONData(DIGIMON_URL + buscador).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarLevels(digimonData);
            mostrarAtributos(digimonData);
            mostrarTipos(digimonData);
            mostrarDescripcion(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });
});




//**************************** BOTONES DE PRUEBAS ****************************
document.getElementById("btnPruebas").addEventListener("click", function(){
    getJSONData(DIGIMON_URL + "guilmon").then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            mostrarLevels(digimonData);
            mostrarAtributos(digimonData);
            mostrarTipos(digimonData);
            mostrarDescripcion(digimonData);
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
            mostrarLevels(digimonData);
            mostrarAtributos(digimonData);
            mostrarTipos(digimonData);
            mostrarDescripcion(digimonData);
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
            mostrarLevels(digimonData);
            mostrarAtributos(digimonData);
            mostrarTipos(digimonData);
            mostrarDescripcion(digimonData);
            mostrarHabilidades(digimonData);
        }
        else {
            alert("Digi-error");
        }
    });       
});