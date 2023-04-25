const GET_BD = "http://localhost:3000/get-digimon-from-BD/";
const GET_AWS = "http://localhost:3000/images-from-AWS/";

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

// Crea el objeto usado para las busquedas en mongo y AWS
async function buscarDigimon(buscador) {
    let unDigimon = {};
    const nombreMin = buscador.toLowerCase();
    const digimonList = await JSON.parse(localStorage.getItem('digimonList'));

    for (i=0; i < digimonList.nombres.length; i++) {
        if (digimonList.nombres[i].nameLowercase === nombreMin) {

            unDigimon = digimonList.nombres[i];
            return unDigimon;
        }
    }
    return console.log("El digimon no existe");
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


// ****************** METODOS DE CARGA DE DATOS EN LA PAGINA ******************













// ****************** BOTON DE BUSQUEDA ******************
document.getElementById("btnBuscar").addEventListener("click", async function () {

    let buscador = document.getElementById("buscador").value

    let digimon = await buscarDigimon(buscador);
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

    console.log(unDigimon); // Aqui esta el Digimon de mi clase, con imagen incluida

    // Tengo que usar el objeto unDigimon como parametro para cargar sus datos en la pagina

});

