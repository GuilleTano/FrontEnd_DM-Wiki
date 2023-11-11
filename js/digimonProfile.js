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
    return document.getElementById("digimon-skills").innerHTML = skillList;
}

// ****************** METODOS PARA LA LINEA EVOLUTIVA ******************

async function showPriorEvolutions(unDigimon) {
    let imagenPrincipal = "";
    let digiName = "";
    let miniaturas = [];
    let selectedClass = "selected";
    let returnObj = {};

    if (unDigimon.priorEvolutions.length == 0) {
        imagenPrincipal = `
            <img src="images/logo-tamers.png" class="card-img-top" alt="No data" id="imagen_principal">
        `;
        digiName = `
            <div class="card-body text-center p-2">
                <p class="card-text fw-bold" id="digiName">No data</p>
            </div>
        `;
        miniaturas += `
            <div class="col text-center">
                <img src="images/logo-tamers.png" alt="No data" class="mx-auto img-thumbnail selected prioEv" 
                id="1" onclick="selectImg(this)">
            </div>
        `;
        return returnObj = {
            imagenPrincipal,
            digiName,
            miniaturas
        }
    }

    for (let i = 0; i < unDigimon.priorEvolutions.length; i++) {
        let priorEvo = (unDigimon.priorEvolutions[i].digimon).normalize('NFKD').replace(/[^\x20-\x7E]/g, '');
        let img = await formatSearch(priorEvo)
            .then((result) => getImgFromS3(result))
            .catch((error) => console.log(error));
        let isFirstItem = i === 0;
        if (isFirstItem) {
            imagenPrincipal = `
                <img src="${img}" alt="${unDigimon.priorEvolutions[i].digimon}" class="card-img-top" id="imagen_principal" 
                onclick="redirectEvo(this.alt)">
            `;
            digiName = `
                <div class="card-body text-center p-2">
                    <p class="card-text fw-bold" id="digiName">${unDigimon.priorEvolutions[i].digimon}</p>
                </div>
            `;
        }
        miniaturas += `
            <div class="col text-center">
                <img src="${img}" alt="${unDigimon.priorEvolutions[i].digimon}" class="mx-auto img-thumbnail prioEv ${isFirstItem ? selectedClass : ''}" 
                id="${unDigimon.priorEvolutions[i].id}" onclick="selectImg(this)">
            </div>
        `;
    }
    return returnObj = {
        imagenPrincipal,
        digiName,
        miniaturas
    }
}

async function showNextEvolutions(unDigimon) {
    let imagenPrincipal = "";
    let digiName = "";
    let miniaturas = [];
    let selectedClass = "selected";
    let returnObj = {};

    if (unDigimon.nextEvolutions.length == 0) {
        imagenPrincipal = `
            <img src="images/logo-tamers.png" class="card-img-top" alt="No data" id="imagen_principal2">
        `;
        digiName = `
            <div class="card-body text-center p-2">
                <p class="card-text fw-bold" id="digiName2">No data</p>
            </div>
        `;
        miniaturas += `
            <div class="col text-center">
                <img src="images/logo-tamers.png" alt="No data" class="mx-auto img-thumbnail selected nextEv" 
                id="7" onclick="selectImg(this)">
            </div>
        `;
        return returnObj = {
            imagenPrincipal,
            digiName,
            miniaturas
        }
    }

    for (let i = 0; i < unDigimon.nextEvolutions.length; i++) {
        if (unDigimon.nextEvolutions[i].id != null) {
            let nextEvo = (unDigimon.nextEvolutions[i].digimon).normalize('NFKD').replace(/[^\x20-\x7E]/g, '');
            let img = await formatSearch(nextEvo)
                .then((result) => getImgFromS3(result))
                .catch((error) => console.log(error));

            let isFirstItem = i === 0;

            if (isFirstItem) {
                imagenPrincipal = `
                <img src="${img}" alt="${unDigimon.nextEvolutions[i].digimon}" class="card-img-top" id="imagen_principal2"
                onclick="redirectEvo(this.alt)">
                `;
                digiName = `
                <div class="card-body text-center p-2">
                    <p class="card-text fw-bold" id="digiName2">${unDigimon.nextEvolutions[i].digimon}</p>
                </div>
                `;
            }
            miniaturas += `
            <div class="col text-center">
                <img src="${img}" alt="${unDigimon.nextEvolutions[i].digimon}" class="mx-auto img-thumbnail nextEv ${isFirstItem ? selectedClass : ''}" id="${unDigimon.nextEvolutions[i].id}" onclick="selectImg2(this)">
            </div>
            `;
        }
    }
    return returnObj = {
        imagenPrincipal,
        digiName,
        miniaturas
    }
}

// ****************** METODO PARA EL AMRADO DE LA PAGINA ******************
async function showDigimon(unDigimon) {
    showSpinner();
    //Cabecera de la carta
    let addHeadCard = ` 
            <div class="text-center card-body py-0"><small>${unDigimon.id}</small></div>
            <h5 class="card-title my-0 py-0">${unDigimon.name}</h5>`;
    document.getElementById("head-card").innerHTML = addHeadCard;

    //Imagen de la carta
    document.getElementById("image-card").innerHTML = `<img src=${unDigimon.image} class="card-img-top" alt=${unDigimon.name}>`;

    //Tabla 1
    let attTable = `
            <div class="col-4">
                ${showLevels(unDigimon)}
            </div>
            <div class="col-4">
                ${showAtributes(unDigimon)}
            </div>
            <div class="col-4">
                ${showTypes(unDigimon)}
            </div>`;
    document.getElementById("att-table").innerHTML = attTable;

    //Tabla 2
    let fieldsTable = ` 
            <tbody>
                <tr>${showFields(unDigimon)}</tr>
            </tbody>`;
    document.getElementById("fields-table").innerHTML = fieldsTable;

    //xAntibody
    document.getElementById("xAntibody").innerHTML = `<p>xAntibody: ${unDigimon.xAntibody}</p>`;

    //Otros datos
    showDescriptions(unDigimon);
    showSkills(unDigimon);

    //Linea Evolutiva
    await showPriorEvolutions(unDigimon).then((resultado) => {
        document.getElementById("galeria-priorEvo").innerHTML = resultado.imagenPrincipal;
        document.getElementById("galeria-priorEvo").innerHTML += resultado.digiName;
        document.getElementById("priorEvo-miniatures").innerHTML = resultado.miniaturas;
    });
    await showNextEvolutions(unDigimon).then((resultado) => {
        document.getElementById("galeria-nextEvo").innerHTML = resultado.imagenPrincipal;
        document.getElementById("galeria-nextEvo").innerHTML += resultado.digiName;
        document.getElementById("nextEvo-miniatures").innerHTML = resultado.miniaturas;
    });

    setTimeout(hideSpinner, 1000);
}


document.addEventListener("DOMContentLoaded", async function () {

    if (localStorage.getItem("unDigimon")) {
        const unDigimon = JSON.parse(localStorage.getItem("unDigimon"));
        await showDigimon(unDigimon);
    }
    else {
        window.location.href = "index.html";
    }

    const input = document.getElementById("buscador");
    const button = document.getElementById("btnBuscar");

    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            button.click();
        }
    });

    // Busqueda normal
    button.addEventListener("click", async function () {
        //clearAlert();
        let search = document.getElementById("buscador").value;
        try {
            const unDigimon = await searchDigimon(search);
            if (!unDigimon) {
                //alertError();
                return errorRedirect();
            }
            localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
            await showDigimon(unDigimon);
            input.value = "";
        } catch (error) {
            // Manejo de errores si la solicitud falla
            console.error("Error en la búsqueda: ", error);
        }
    });

    // Busqueda random
    document.getElementById("randomBtn").addEventListener("click", async function () {
        try {
            const digiSearch = await randomSearch();
            const unDigimon = await searchDigimon(digiSearch);
    
            localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
            await showDigimon(unDigimon);
        } catch(error) {
            // Manejo de errores si la solicitud falla
            console.error("Error en la búsqueda: ", error);
        }
    });
});
