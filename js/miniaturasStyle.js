document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todos los carousels en la página
    const carousels = document.querySelectorAll(".carousel");
     
    // Iterar sobre los carousels y agregar un evento al carrusel que se active cuando cambie de imagen


    carousels.forEach(function (carousel) {

        // TENGO QUE LOGRAR APLICAR ESTE EFECTO EN UN EVENTO DIFERENTE 
      carousel.addEventListener("slide.bs.carousel", function (event) {
        // Obtener la posición actual de la imagen
        const currentSlide = event.to;
        // Obtener todas las miniaturas en la sección de miniaturas
        const indicators = this.querySelectorAll(".carousel-indicators-mini button");
        // Ocultar todas las miniaturas
        indicators.forEach(function (indicator) {
          indicator.style.display = "none";
        });
        // Mostrar las seis miniaturas siguientes a la posición actual
        for (let i = currentSlide; i < currentSlide + 6 && i < indicators.length; i++) {
          indicators[i].style.display = "block";
        }
      });
    });
});

