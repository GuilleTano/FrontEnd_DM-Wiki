const GET_BD = "http://localhost:3000/get-digimon-from-BD/";
const GET_AWS = "http://localhost:3000/images-from-AWS/";

// ****************** CLASE PARA EL OBJETO DIGIMON ******************
class DigimonModel {
    constructor(id, name, types, xAntibody, releaseDate, levels, fields, attributes, descriptions, skills, priorEvolutions, nextEvolutions) {
        this.name = name,
            this.id = id,
            this.types = types,
            this.xAntibody = xAntibody,
            this.releaseDate = releaseDate,
            this.levels = levels,
            this.fields = fields,
            this.attributes = attributes,
            this.descriptions = descriptions,
            this.skills = skills,
            this.priorEvolutions = priorEvolutions,
            this.nextEvolutions = nextEvolutions,
            this.image = ""
    }

    set addImage(imagen) {
        this.image = imagen;
    }
}

// ****************** METODOS PARA LA BUSQUEDA Y SOLICITUD DE DATOS ******************

// Verifica que el nombre exista en la lista solicitada al servidor
async function formatSearch(buscador) {
    let unDigimon = {};
    const nombreMin = buscador.toLowerCase();
    const digimonList = await JSON.parse(localStorage.getItem('digimonList'));

    for (i = 0; i < digimonList.nombres.length; i++) {
        if (digimonList.nombres[i].nameLowercase === nombreMin) {
            unDigimon = digimonList.nombres[i];
            return unDigimon;
        }
    }
    return //console.log("El digimon " + nombreMin + " no existe");
}

// Este metodo trae los datos de MongoDB
async function getDigimonFromMongo(digimon) {
    let nombreMongo = digimon.mongoName;

    return fetch(GET_BD + nombreMongo)
        .then(response => response.json())
        .then(digiMongo => {
            if (digiMongo.message) {
                return console.log(digiMongo);
            }
            const digimonData = digiMongo;

            //console.log("Datos del digimon:");
            //console.log(digimonData);

            return digimonData;
        }).catch(error => console.error(error));
}

// Este metodo trae la imagen de AWS
async function getImgFromS3(digimon) {
    let nombreAWS = digimon.s3ImageName;

    return fetch(GET_AWS + nombreAWS)
        .then(response => response.json())
        .then(awsImage => {
            const digimonImage = awsImage.url;

            //console.log("Imagen del digimon:");
            //console.log(digimonImage);

            return digimonImage;
        }).catch(error => console.error(error));
}

//Metodo que devuelve el Digimon como objeto (si existe, sino devuelve vacio)
async function searchDigimon(search) {
    let clearSearch = search.normalize('NFKD').replace(/[^\x20-\x7E]/g, ''); //Esta linea elimina caracteres invisibles
    let digimon = await formatSearch(clearSearch);
    if (!digimon) return
    let digimonData = await getDigimonFromMongo(digimon);
    let digimonImage = await getImgFromS3(digimon);

    const unDigimon = new DigimonModel(
        digimonData.id,
        digimonData.name,
        digimonData.types,
        digimonData.xAntibody,
        digimonData.releaseDate,
        digimonData.levels,
        digimonData.fields,
        digimonData.attributes,
        digimonData.descriptions,
        digimonData.skills,
        digimonData.priorEvolutions,
        digimonData.nextEvolutions
    );
    unDigimon.addImage = digimonImage;

    return unDigimon
}

//Metodo para redireccionar al seleccionar una evo
async function redirectEvo(search) {
    const unDigimon = await searchDigimon(search);
    showDigimon(unDigimon);
}

// ****************** Metodos para alerta en busquedas y spinner ******************

function alertError() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert" id="search-error">`,
            `   <div class="text-center fw-bolder">${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')
        alertPlaceholder.append(wrapper);
    }
    return alert('El Digimon buscado no existe', 'danger');
}

function clearAlert() {
    let alert = document.querySelector('#search-error');
    if (alert) alert.remove();
    location.reload;
}

let showSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "none";
}

// ********************* Solicitud de lista al servidor *********************

async function solicitarLista() {
    let expiraEn = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas en milisegundos

    await fetch("http://localhost:3000/digimon-list")
        .then(response => response.json())
        .then(data => {
            console.log("Lista recibida");
            let digimonList = JSON.stringify({
                nombres: data,
                expiraEn: expiraEn
            })
            localStorage.setItem("digimonList", digimonList);
            console.log("Lista guardada");
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", async function () {

    /***********************************************************************************************************/
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    /***********************************************************************************************************/

    if (!localStorage.getItem('digimonList')) {
        solicitarLista();
    }
    else {
        console.log("Ya existe la lista");
        const digimonList = JSON.parse(localStorage.getItem('digimonList'));

        if (new Date().getTime() > digimonList.expiraEn) {
            // Elimina los datos si la fecha de caducidad ha pasado
            localStorage.removeItem('digimonList');
            solicitarLista();
        }
    }
});
