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
        clearAlert();
        let digiSearch = document.getElementById("indexSearch").value;
        showSpinner();
        const unDigimon = await searchDigimon(digiSearch);
        if (!unDigimon) {
            hideSpinner();
            alertError();
            return
        }
        localStorage.setItem("unDigimon", JSON.stringify(unDigimon));
        hideSpinner();
        searchRedirection();
    });
});
