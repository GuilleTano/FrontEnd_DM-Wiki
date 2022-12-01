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
                    <td>${digimonData.skills[i].skill}</td>
                    <td>${digimonData.skills[i].description}</td>
                </tr>
            `;
        }
        else{
            habilidades += `
                <tr>
                    <td>${digimonData.skills[i].skill} / ${digimonData.skills[i].translation}</td>
                    <td>${digimonData.skills[i].description}</td>
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
        arrayPreEvos += `
        <div class="col">
            <div class="card" style="width: 10rem;">
                <img src="images/logo-tamers.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-subtitle text-muted fs-6 lh-1 fw-bold"><small>${digimonData.priorEvolutions[i].id}</small></p>
                    <p class="card-title lh-1 fs-5 fw-bold">${digimonData.priorEvolutions[i].digimon}</p>
                    <p class="card-text fs-6 lh-1">${digimonData.priorEvolutions[i].condition}</p>
                </div>
            </div>
        </div>`;
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

//REDIRECCION DE EVOLUCIONES
function redirecEvo(){
    document.getElementById("btnPruebas").addEventListener("click", function(){
        getJSONData(DIGIMON_URL + redireccion).then(resultObj => {
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
}


// FUNCION MOSTRAR - MUESTRA LA CARTA DEL DIGIMON Y LA DESCRIPCION
function mostrarDigimon() {
    //Cabecera carta
    let addHeadCard = `
    <div class="text-center card-body py-0"><small>${digimonData.id}</small></div>
    <h5 class="card-title my-0 py-0">${digimonData.name}</h5>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    //Imagen carta
    document.getElementById("image-card").innerHTML = `<img src=${digimonData.images[0].href} class="card-img-top" alt="example-card">`;

    //Tabla 1
    let attTable = `

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
    document.getElementById("english-info").innerHTML = `<p>${mostrarDescripcion()}</p>`;


    //Pre Evo
    document.getElementById("pre-evoluciones").innerHTML = mostrarPreEvoluciones();

    //Evo
    // document.getElementById("evoluciones").innerHTML = mostrarEvoluciones();

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