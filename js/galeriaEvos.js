// Script para la galeria de evoluciones

function selectImg(img){
  let listaMin = document.querySelectorAll('.prioEv');
  listaMin.forEach(function(miniatura) {
    miniatura.classList.remove("selected");
  });
  document.getElementById(img.id).classList.add('selected');
  document.getElementById('imagen_principal').src=img.src;
  document.getElementById('imagen_principal').alt=img.alt;
}

function selectImg2(img){
  let listaMin = document.querySelectorAll('.nextEv');
  listaMin.forEach(function(miniatura) {
    miniatura.classList.remove("selected");
  });
  document.getElementById(img.id).classList.add('selected');
  document.getElementById('imagen_principal2').src=img.src;
  document.getElementById('imagen_principal2').alt=img.alt;
}

// Prior Evo

document.getElementById("nextBtnPriorEvo").addEventListener('click', () => {
  let listaMin = document.querySelectorAll('.prioEv');
  for(i=0; i < listaMin.length; i++){
    if(listaMin[i].classList.contains("selected")){
      listaMin[i].classList.remove("selected");
      if(i < listaMin.length-1){
        i++
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
        document.getElementById('imagen_principal').alt=listaMin[i].alt;
      }
      else{
        i=0
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
        document.getElementById('imagen_principal').alt=listaMin[i].alt;
      }
    }
  }
});

document.getElementById("prevBtnPriorEvo").addEventListener('click', () => {
  let listaMin = document.querySelectorAll('.prioEv');
  for(i=0; i < listaMin.length; i++){
    if(listaMin[i].classList.contains("selected")){
      listaMin[i].classList.remove("selected");
      if(i > 0){
        i--
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
        document.getElementById('imagen_principal').alt=listaMin[i].alt;
      }
      else if(i==0){
        i=listaMin.length-1
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
        document.getElementById('imagen_principal').alt=listaMin[i].alt;
      }
    }
  }
});

// Next Evo

document.getElementById("nextBtnNextEvo").addEventListener('click', () => {
  let listaMin = document.querySelectorAll('.nextEv');
  for(i=0; i < listaMin.length; i++){
    if(listaMin[i].classList.contains("selected")){
      listaMin[i].classList.remove("selected");
      if(i < listaMin.length-1){
        i++
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
        document.getElementById('imagen_principal2').alt=listaMin[i].alt;
      }
      else{
        i=0
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
        document.getElementById('imagen_principal2').alt=listaMin[i].alt;
      }
    }
  }
});

document.getElementById("prevBtnNextEvo").addEventListener('click', () => {
  let listaMin = document.querySelectorAll('.nextEv');
  for(i=0; i < listaMin.length; i++){
    if(listaMin[i].classList.contains("selected")){
      listaMin[i].classList.remove("selected");
      if(i > 0){
        i--
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
        document.getElementById('imagen_principal2').alt=listaMin[i].alt;
      }
      else if(i==0){
        i=listaMin.length-1
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
        document.getElementById('imagen_principal2').alt=listaMin[i].alt;
      }
    }
  }
});
