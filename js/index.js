document.addEventListener("DOMContentLoaded", function () {
    
    // Funcionalidad para hacer busuquedas con el boton "Enter"
    const input = document.getElementById("indexSearch");
    const button = document.getElementById("btnIndexSearch");
    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click();
        }
    });

    // Busqueda normal
    button.addEventListener("click", async function () {
        let digiSearch = document.getElementById("indexSearch").value;
        try{
            const unDigimon = await searchDigimon(digiSearch);
            if (!unDigimon) {
                // Se intenta crear una lista de resultados relacionados
                const relacionadoList = relacionados(digiSearch);
                // Si no hay ninguno, se redirecciona a vista de error
                if(relacionadoList.length <1){
                    return errorRedirect();
                } 
                // Si existe se mostraria la lista de relacionados
                console.log(relacionadoList);
                return
            }
            else {
                //Si el Digimon existe se redirecciona a la vista del perfil
                localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
                return searchRedirection();
            }
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
