const GET_BD = "http://localhost:3000/get-digimon-from-BD/";
const GET_AWS = "http://localhost:3000/images-from-AWS/";


// ****************** METODOS DE SOLICITUD DE DATOS AL SERVIDOR ******************

// Da formato a la busqueda ingresada
function formatString(string) {
    // convierte la primera letra de cada palabra en mayúscula
    string = string.replace(/\b\w/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // convierte los números romanos a mayúsculas
    string = string.replace(/\b(?:(?:i{1,3}(?=[^a-z]|$))|(?:iv(?=[^a-z]|$))|(?:v(?=[^a-z]|$))|(?:vi{1,3}(?=[^a-z]|$))|(?:ix(?=[^a-z]|$))|(?:x{1,3}(?=[^a-z]|$)))\b/gi, function (txt) {
        return txt.toUpperCase();
    });

    return string;
}

// Funcion para buscador
async function buscarDigimon(nombre) {

    const nombreMin = nombre.toLowerCase();
    //const listaNombres = JSON.parse(objectList.json);

    await fetch('../JSON/objectList.json')
    .then(response => response.json())
    .then(data => {
            // Aquí ya tienes los datos parseados en la variable 'data'
            //console.log(data);
            let listaNombres = JSON.parse(data);

            for (digimon of listaNombres) {

                if (nombreMin === digimon.nameLowercase) {
                    return console.log("Busqueda para AWS: " + digimon.s3ImageName);
                }
        
        
                return console.log("No existe o no funciono");
            }
    })
    .catch(error => console.error(error));
}




// Este metodo trae la imagen del Digimon de AWS
async function getImgFromS3(nombre) {

    let newName = formatString(nombre);
    newName = newName.replace(/\s+/g, '_');

    fetch(GET_AWS + newName)
        .then(response => response.json())
        .then(awsImage => {
            console.log(awsImage);

            const imagen = awsImage.url;
            document.getElementById("image-card").innerHTML = `<img src=${imagen} class="card-img-top" alt="example-card">`;
        }).catch(error => console.error(error));
}

// Este metodo deberia traer el resto de datos de MongoDB
async function getDigimonFromMongo(nombre) {

    let newName = formatString(nombre);

    fetch(GET_BD + newName)
        .then(response => response.json())
        .then(digiMongo => {
            if (digiMongo.message) {
                return console.log(digiMongo);
            }
            console.log(digiMongo);
            mostrarDigimon(digiMongo); // Aqui deberia agregar cada atributo del digimon a su lugar en el html

        }).catch(error => console.error(error));
}


// ****************** METODOS DE CARGA DE DATOS EN LA PAGINA ******************

//ESTAS FUNCIONES MUESTRAN LOS DATOS EN LA CARTA
function mostrarLevels(digimonData) {
    let arrayLevels = [];
    for (let i = 0; i < digimonData.levels.length; i++) {
        arrayLevels += `<div>${digimonData.levels[i].level}</div>`;
    }
    return arrayLevels;
}

function mostrarAtributos(digimonData) {
    let arrayAtributos = [];
    for (let i = 0; i < digimonData.attributes.length; i++) {
        arrayAtributos += `<div>${digimonData.attributes[i].attribute}</div>`;
    }
    return arrayAtributos;
}

function mostrarTipos(digimonData) {
    let arrayTipos = [];
    for (let i = 0; i < digimonData.types.length; i++) {
        arrayTipos += `<div>${digimonData.types[i].type}</div>`;
    }
    return arrayTipos;
}

function mostrarFields(digimonData) {
    let fieldsID = [];
    for (let i = 0; i < digimonData.fields.length; i++) {
        let fieldID = 0;
        switch (digimonData.fields[i].id) {
            case 1: fieldID = "images/NatureSpirits.png";
                break;
            case 2: fieldID = "images/VirusBusters.png";
                break;
            case 3: fieldID = "images/WindGuardians.png";
                break;
            case 4: fieldID = "images/Unknown.png";
                break;
            case 5: fieldID = "images/MetalEmpire.png";
                break;
            case 6: fieldID = "images/DeepSavers.png";
                break;
            case 7: fieldID = "images/DarkArea.png";
                break;
            case 8: fieldID = "images/NightmareSoldiers.png";
                break;
            case 9: fieldID = "images/DragonsRoar.png";
                break;
            case 10: fieldID = "images/JungleTroopers.png";
                break;
        }
        fieldsID += `<td><img src="${fieldID}" alt="${digimonData.fields[i].field}"></td>`;
    }
    return fieldsID;
}

//FILTRA LAS DESCRIPCIONES Y LAS MUESTRA SEGUN EL IDIOMA
function mostrarDescripcion(digimonData) {
    let descriptionEn = "";
    let descriptionJp = "";
    for (let i = 0; i < digimonData.descriptions.length; i++) {
        if (digimonData.descriptions[i].language == "en_us") {
            descriptionEn = `<p>${digimonData.descriptions[i].description}</p>`;
        }
        else {
            descriptionJp = `<p>${digimonData.descriptions[i].description}</p>`;
        }
    }
    document.getElementById("english-info").innerHTML = descriptionEn;
    document.getElementById("japanese-info").innerHTML = descriptionJp;
}

//FUNCION PARA MOSTRAR LAS SKILLS
function mostrarHabilidades(digimonData) {
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
        else {
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
function mostrarPreEvoluciones(digimonData) {
    let arrayPreEvos = [];
    for (let i = 0; i < digimonData.priorEvolutions.length; i++) {

        if (digimonData.priorEvolutions[i].id != null) {
            arrayPreEvos += `
            <div class="col">
                <div class="card" style="width: 10rem; height: 16rem;">
                    <div id="${digimonData.priorEvolutions[i].digimon}">
                        
                    </div>
                    <div class="card-body overflow-auto">
                        <p class="card-title lh-1 fs-5 fw-bold">${digimonData.priorEvolutions[i].digimon}</p>
                        <p class="card-text fs-6 lh-1">${digimonData.priorEvolutions[i].condition}</p>
                    </div>
                </div>
            </div>`;
            priorEvoImages(digimonData.priorEvolutions[i].digimon);
        }
    }
    return arrayPreEvos;
}
function mostrarEvoluciones(digimonData) {
    let arrayEvos = [];
    for (let i = 0; i < digimonData.nextEvolutions.length; i++) {

        if (digimonData.nextEvolutions[i].id != null) {

            arrayEvos += `
            <div class="col">
                <div class="card" style="width: 10rem; height: 16rem;">
                    <div id="${digimonData.nextEvolutions[i].digimon}">
                        <img src="images/logo-tamers.png" class="card-img-top" alt=${digimonData.nextEvolutions[i].digimon}>
                    </div>
                    <div class="card-body overflow-auto">
                        <p class="card-title lh-1 fs-5 fw-bold">${digimonData.nextEvolutions[i].digimon}</p>
                        <p class="card-text fs-6 lh-1">${digimonData.nextEvolutions[i].condition}</p>
                    </div>
                </div>
            </div>`;
            nextEvoImages(digimonData.nextEvolutions[i].digimon);
        }
    }
    return arrayEvos;
}

//Imagenes pre-evos
function priorEvoImages(nombre) {
    let newName = formatString(nombre);
    newName = newName.replace(/\s+/g, '_');

    fetch(GET_AWS + newName)
        .then(response => response.json())
        .then(awsImage => {
            const imagen = awsImage.url;
            document.getElementById(nombre).innerHTML = `<img src=${imagen} class="card-img-top" alt=${newName}>`;
        }).catch(error => console.error(error));
}

//Imagenes evos
function nextEvoImages(nombre) {
    let newName = formatString(nombre);
    newName = newName.replace(/\s+/g, '_');

    fetch(GET_AWS + newName)
        .then(response => response.json())
        .then(awsImage => {
            const imagen = awsImage.url;
            document.getElementById(nombre).innerHTML = `<img src=${imagen} class="card-img-top" alt=${newName}>`;
        }).catch(error => console.error(error));
}

// FUNCION MOSTRAR - MUESTRA LA CARTA DEL DIGIMON Y LA DESCRIPCION
function mostrarDigimon(digimonData) {
    //Cabecera carta
    let addHeadCard = `
    <div class="text-center card-body py-0"><small>${digimonData.id}</small></div>
    <h5 class="card-title my-0 py-0">${digimonData.name}</h5>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    //document.getElementById("image-card").innerHTML = `<img src=${getImgFromS3(digimonData.name)} class="card-img-top" alt="example-card">`;


    //Tabla 1
    let attTable = `<tbody>
                        <tr>
                            <td>${mostrarLevels(digimonData)}</td>
                            <td>${mostrarAtributos(digimonData)}</td>
                            <td>${mostrarTipos(digimonData)}</td>
                        </tr>
                    </tbody>`;
    document.getElementById("att-table").innerHTML = attTable;

    //Tabla 2
    let fieldsTable = `<tbody>
                        <tr>${mostrarFields(digimonData)}</tr>
                    </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    //xAntibody
    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${digimonData.xAntibody}</p>`;

    mostrarDescripcion(digimonData);
    mostrarHabilidades(digimonData);
    //Pre Evo
    document.getElementById("pre-evoluciones").innerHTML = mostrarPreEvoluciones(digimonData);

    //Evo
    document.getElementById("evoluciones").innerHTML = mostrarEvoluciones(digimonData);
}


/*Detalles de evoluciones
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

    let buscador = document.getElementById("buscador").value

    getImgFromS3(buscador);
    getDigimonFromMongo(buscador);

    buscarDigimon(buscador);
});






/**************************** BOTON DE PRUEBA (ya no sirve) ****************************
document.getElementById("btnPruebas").addEventListener("click", function () {
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
*/


/**************************** PENDIENTES Y EN PROCESO ****************************



*/

// POSIBLE SISTEMA DE SUGERENCIAS DE BUSQUEDA?
/*

function searchSuggestions(search) {
    const searchLowercase = search.toLowerCase();
    const suggestions = [];
    for (let i = 0; i < objectList.length; i++) {
        const objectName = objectList[i].nameLowercase;
        if (objectName.includes(searchLowercase)) {
            // La cadena de búsqueda coincide parcialmente con el nombre en minúsculas del objeto
            suggestions.push(objectList[i].mongoName);
        } else {
            // La cadena de búsqueda no coincide parcialmente con el nombre en minúsculas del objeto,
            // pero podría haber sugerencias basadas en una comparación de cadenas más avanzada
            // por ejemplo, utilizando técnicas de comparación de cadenas de texto como Levenshtein
            // distance o Fuzzy matching.
            // Aquí podrías añadir código para implementar esas técnicas.
        }
    }
    return suggestions;
}


*/
