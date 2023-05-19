function searchRedirection() {
    window.location.href = "buscar_digimon.html";
}

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("indexSearch");
    const button = document.getElementById("btnIndexSearch");

    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click();
        }
    });

    button.addEventListener("click", async function () {
        //clearAlert();     | Para habilitar nuevamente esto tengo que crear alertas para el index.html

        let digiSearch = document.getElementById("indexSearch").value;

        //guardar nombre del digimon el LS ??

        localStorage.setItem("digiSearch", digiSearch);

        searchRedirection();

    });
});
