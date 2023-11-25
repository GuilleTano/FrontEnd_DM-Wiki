function relatedResult(){
    const resultList = JSON.parse(localStorage.getItem("relacionadoList"));
    localStorage.removeItem("relacionadoList");
    let relatedList = "";

    for(digimon of resultList){
        relatedList +=`
        <li class="list-group-item bg-dark">
            <button type="button" class="btn btn-dark">${digimon.mongoName}</button>
        </li>`;
    }
    return document.getElementById("relatedList").innerHTML = relatedList;
}


document.addEventListener("DOMContentLoaded", function () {

    if(localStorage.getItem("relacionadoList")){
        const relButton = document.getElementById("relBtn");
        relButton.hidden = false;
        relatedResult();
    }

    // Funcionalidad para hacer busuquedas con el boton "Enter"
    const input = document.getElementById("buscador");
    const button = document.getElementById("btnBuscar");
    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click();
        }
    });

    // Busqueda normal
    button.addEventListener("click", async function () {
        let digiSearch = document.getElementById("buscador").value;
        try{
            const unDigimon = await searchDigimon(digiSearch);
            if (!unDigimon) {
                return errorRedirect();
            }
            localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
            searchRedirection();
        } catch(error) {
            console.error("Error en la búsqueda: ", error);
        }
    });

    // Busqueda random
    document.getElementById("randomBtn").addEventListener("click", async function () {

        const digiSearch = await randomSearch();
        const unDigimon = await searchDigimon(digiSearch);

        localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
        searchRedirection();
    });

});
