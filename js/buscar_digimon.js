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
async function formatSearch(buscador) {
    let unDigimon = {};
    const nombreMin = buscador.toLowerCase();
    const digimonList = await JSON.parse(localStorage.getItem('digimonList'));

    for (i=0; i < digimonList.nombres.length; i++) {
        if (digimonList.nombres[i].nameLowercase === nombreMin) {

            unDigimon = digimonList.nombres[i];
            return unDigimon;
        }
    }

    return console.log("El digimon " + nombreMin + " no existe");
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


async function searchDigimon(){
    let search = document.getElementById("buscador").value
    let clearSearch = search.normalize('NFKD').replace(/[^\x20-\x7E]/g, ''); //Esta linea elimina caracteres invisibles
    let digimon = await formatSearch(clearSearch);
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

// ****************** METODOS DE CARGA DE DATOS EN LA PAGINA ******************

function showLevels(unDigimon) {
    let levelsList = [];
    for (let i = 0; i < unDigimon.levels.length; i++) {
        levelsList += `<div>${unDigimon.levels[i].level}</div>`;
    }
    return levelsList;
}

function showAtributes(unDigimon) {
    let atributesList = [];
    for (let i = 0; i < unDigimon.attributes.length; i++) {
        atributesList += `<div>${unDigimon.attributes[i].attribute}</div>`;
    }
    return atributesList;
}

function showTypes(unDigimon) {
    let typesList = [];
    for (let i = 0; i < unDigimon.types.length; i++) {
        typesList += `<div>${unDigimon.types[i].type}</div>`;
    }
    return typesList;
}

function showFields(unDigimon) {
    let fieldsList = [];
    for (let i = 0; i < unDigimon.fields.length; i++) {
        let fieldID = 0;
        switch (unDigimon.fields[i].id) {
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
        fieldsList += `<td><img src="${fieldID}" alt="${unDigimon.fields[i].field}"></td>`;
    }
    return fieldsList;
}

function showDescriptions(unDigimon) {
    let descriptionEn = "";
    let descriptionJp = "";
    for (let i = 0; i < unDigimon.descriptions.length; i++) {
        if (unDigimon.descriptions[i].language == "en_us") {
            descriptionEn = `<p>${unDigimon.descriptions[i].description}</p>`;
        }
        else {
            descriptionJp = `<p>${unDigimon.descriptions[i].description}</p>`;
        }
    }
    document.getElementById("english-info").innerHTML = descriptionEn;
    document.getElementById("japanese-info").innerHTML = descriptionJp;
}

function showSkills(unDigimon) {
    let skillList = [];
    for (let i = 0; i < unDigimon.skills.length; i++) {
        if (unDigimon.skills[i].translation == "") {
            skillList += `
            <div class="accordion-item bg-dark">
                <h2 class="accordion-header" id="panelsStayOpen-heading${i}">
                    <button class="accordion-button collapsed bg-dark text-light p-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${i}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${i}">
                        
                        ${unDigimon.skills[i].skill}
            
                    </button>
                </h2>
                <div id="panelsStayOpen-collapse${i}" class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-heading${i}">
                    <div class="accordion-body text-light p-2 desc-Skill">
            
                        ${unDigimon.skills[i].description}
            
                    </div>
                </div>
            </div>
            `;
        }
        else {
            skillList += `
            <div class="accordion-item bg-dark">
                <h2 class="accordion-header" id="panelsStayOpen-heading${i}">
                    <button class="accordion-button collapsed bg-dark text-light p-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse${i}" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse${i}">
                    
                        ${unDigimon.skills[i].skill} / ${unDigimon.skills[i].translation}

                    </button>
                </h2>
                <div id="panelsStayOpen-collapse${i}" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-heading${i}">
                    <div class="accordion-body text-light p-2 desc-Skill">

                        ${unDigimon.skills[i].description}

                    </div>
                </div>
            </div>
            `;
        }
    }
    document.getElementById("digimon-skills").innerHTML = skillList;
}

// ****************** METODOS PARA LA LINEA EVOLUTIVA ******************

async function showPriorEvolutions(unDigimon) {
    let imagenPrincipal = "";
    let miniaturas = [];
    let selectedClass = "selected";

    for (let i = 0; i < unDigimon.priorEvolutions.length; i++) {
        if (unDigimon.priorEvolutions[i].id != null) {
            let priorEvo = (unDigimon.priorEvolutions[i].digimon).normalize('NFKD').replace(/[^\x20-\x7E]/g, '');
            let img = await formatSearch(priorEvo)
            .then((result) => getImgFromS3(result))
            .catch((error) => console.log(error));

            let isFirstItem = i === 0;

            if(isFirstItem){
                imagenPrincipal = `
                <img src="${img}" alt="${unDigimon.priorEvolutions[i].digimon}" class="mainImg rounded" id="imagen_principal">
                `;
            }

            miniaturas += `
            <div class="col text-center">
                <img src="${img}" alt="${unDigimon.priorEvolutions[i].digimon}" class="mx-auto minImg img-thumbnail prioEv ${isFirstItem ? selectedClass : ''}" id="${unDigimon.priorEvolutions[i].id}" onclick="selectImg(this)">
            </div>
            `;
        }
    }

    let returnObj={
        imagenPrincipal,
        miniaturas
    }

    return returnObj;
}

async function showNextEvolutions(unDigimon) {
    let imagenPrincipal = "";
    let miniaturas = [];
    let selectedClass = "selected";

    for (let i = 0; i < unDigimon.nextEvolutions.length; i++) {
        if (unDigimon.nextEvolutions[i].id != null) {
            let nextEvo = (unDigimon.nextEvolutions[i].digimon).normalize('NFKD').replace(/[^\x20-\x7E]/g, '');
            let img = await formatSearch(nextEvo)
            .then((result) => getImgFromS3(result))
            .catch((error)=> console.log(error));

            let isFirstItem = i === 0;

            if(isFirstItem){
                imagenPrincipal = `
                <img src="${img}" alt="${unDigimon.nextEvolutions[i].digimon}" class="mainImg rounded" id="imagen_principal2">
                `;
            }

            miniaturas += `
            <div class="col text-center">
                <img src="${img}" alt="${unDigimon.nextEvolutions[i].digimon}" class="mx-auto minImg img-thumbnail nextEv ${isFirstItem ? selectedClass : ''}" id="${unDigimon.nextEvolutions[i].id}" onclick="selectImg2(this)">
            </div>
            `;
        }
    }

    let returnObj={
        imagenPrincipal,
        miniaturas
    }

    return returnObj;
}


async function showDigimon(unDigimon) {
    //Cabecera carta
    let addHeadCard = ` <div class="text-center card-body py-0"><small>${unDigimon.id}</small></div>
                        <h5 class="card-title my-0 py-0">${unDigimon.name}</h5>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    document.getElementById("image-card").innerHTML = `<img src=${unDigimon.image} class="card-img-top" alt=${unDigimon.name}>`;

    //Tabla 1
    let attTable =` <tbody>
                        <tr>
                            <td>${showLevels(unDigimon)}</td>
                            <td>${showAtributes(unDigimon)}</td>
                            <td>${showTypes(unDigimon)}</td>
                        </tr>
                    </tbody>`;
    document.getElementById("att-table").innerHTML = attTable;

    //Tabla 2
    let fieldsTable =`  <tbody>
                            <tr>${showFields(unDigimon)}</tr>
                        </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    //xAntibody
    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${unDigimon.xAntibody}</p>`;

    showDescriptions(unDigimon);
    showSkills(unDigimon);

    showPriorEvolutions(unDigimon).then((resultado)=>{
        document.getElementById("galeria-priorEvo").innerHTML = resultado.imagenPrincipal;
        document.getElementById("priorEvo-miniatures").innerHTML = resultado.miniaturas;
    });

    showNextEvolutions(unDigimon).then((resultado)=>{
        document.getElementById("galeria-nextEvo").innerHTML = resultado.imagenPrincipal;
        document.getElementById("nextEvo-miniatures").innerHTML = resultado.miniaturas;
    });

}






// ****************** BOTON DE BUSQUEDA ******************
document.getElementById("btnBuscar").addEventListener("click", async function () {

    const unDigimon = await searchDigimon();
    console.log(unDigimon);
    showDigimon(unDigimon);

});
