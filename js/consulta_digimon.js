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

//FILTRA LAS DESCRIPCIONES Y LAS MUESTRA SEGUN EL IDIOMA
function mostrarDescripcion() {
    let descriptionEn = "";
    let descriptionJp = "";
    for (let i = 0; i < digimonData.descriptions.length; i++) {
        if (digimonData.descriptions[i].language == "en_us") {
            descriptionEn = `<p>${digimonData.descriptions[i].description}</p>`;
        }
        else{
            descriptionJp = `<p>${digimonData.descriptions[i].description}</p>`;
        }
    }
    document.getElementById("english-info").innerHTML = descriptionEn;
    document.getElementById("japanese-info").innerHTML = descriptionJp;
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

        if(digimonData.priorEvolutions[i].id != null){

            //console.log(digimonData.priorEvolutions[i].id)
            //console.log( priorEvoImages(digimonData.priorEvolutions[i].id) );

            arrayPreEvos += `
            <div class="col">
                <div class="card" style="width: 10rem; height: 16rem;">
                    <div id=${digimonData.priorEvolutions[i].id}>
                        <img src="images/logo-tamers.png" class="card-img-top" alt=${digimonData.priorEvolutions[i].digimon}>
                    </div>
                    <div class="card-body overflow-auto">
                        <p class="card-title lh-1 fs-5 fw-bold">${digimonData.priorEvolutions[i].digimon}</p>
                        <p class="card-text fs-6 lh-1">${digimonData.priorEvolutions[i].condition}</p>
                    </div>
                </div>
            </div>`;
            priorEvoImages(digimonData.priorEvolutions[i].id);
        }
    }
    return arrayPreEvos;
}
function mostrarEvoluciones() {
    let arrayEvos = [];
    for (let i = 0; i < digimonData.nextEvolutions.length; i++) {

        if(digimonData.nextEvolutions[i].id != null){

            arrayEvos += `
            <div class="col">
                <div class="card" style="width: 10rem; height: 16rem;">
                    <div id=${digimonData.nextEvolutions[i].id}>
                        <img src="images/logo-tamers.png" class="card-img-top" alt=${digimonData.nextEvolutions[i].digimon}>
                    </div>
                    <div class="card-body overflow-auto">
                        <p class="card-title lh-1 fs-5 fw-bold">${digimonData.nextEvolutions[i].digimon}</p>
                        <p class="card-text fs-6 lh-1">${digimonData.nextEvolutions[i].condition}</p>
                    </div>
                </div>
            </div>`;
            evoImages(digimonData.nextEvolutions[i].id);
        }
    }
    return arrayEvos;
}

//Imagenes pre-evos
function priorEvoImages(prioID){
    let prioImg = "";
    const digimonID = prioID;

    return fetch(DIGIMON_URL + digimonID)
    .then(respuesta => respuesta.json())
    .then(digimon =>{

        prioImg = digimon.images[0].href;

        document.getElementById(prioID).innerHTML = `<img src=${prioImg} class="card-img-top" alt="...">`;
    })
    .catch(error => alert("Hubo un error en las fotos: " + error));
}

//Imagenes evos
function evoImages(evoID){
    let evoImg = "";
    const digimonID = evoID;

    return fetch(DIGIMON_URL + digimonID)
    .then(respuesta => respuesta.json())
    .then(digimon =>{

        evoImg = digimon.images[0].href;

        document.getElementById(evoID).innerHTML = `<img src=${evoImg} class="card-img-top" alt="...">`;
    })
    .catch(error => alert("Hubo un error en las fotos: " + error));
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
    let attTable = `<tbody>
                        <tr>
                            <td>${mostrarLevels()}</td>
                            <td>${mostrarAtributos()}</td>
                            <td>${mostrarTipos()}</td>
                        </tr>
                    </tbody>`;
    document.getElementById("att-table").innerHTML = attTable;

    //Tabla 2
    let fieldsTable =`<tbody>
                        <tr>${mostrarFields()}</tr>
                    </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    //xAntibody
    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${digimonData.xAntibody}</p>`;

    mostrarDescripcion();
    mostrarHabilidades();
    //Pre Evo
    document.getElementById("pre-evoluciones").innerHTML = mostrarPreEvoluciones();

    //Evo
    document.getElementById("evoluciones").innerHTML = mostrarEvoluciones();
}


/*
//Detalles de evoluciones
function evoDetails(){

}
*/





//REDIRECCION DE EVOLUCIONES - en construccion
/*
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
*/


document.getElementById("btnBuscar").addEventListener("click", function () {

    buscador = document.getElementById("buscador").value;
    getJSONData(DIGIMON_URL + buscador).then(resultObj => {
        if (resultObj.status === "ok") {
            digimonData = resultObj.data;
            console.log(digimonData);
            mostrarDigimon(digimonData);
            //mostrarHabilidades(digimonData);
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