// Redireccion al buscar
function searchRedirection() {
    window.location.href = "buscarDigimon.html";
}

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
        clearAlert();
        let digiSearch = document.getElementById("indexSearch").value;
        try{
            const unDigimon = await searchDigimon(digiSearch);
            if (!unDigimon) {
                alertError();
                return
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
