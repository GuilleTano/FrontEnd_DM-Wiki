// Script para la galeria de evoluciones

function selectImg(img){
  let listaMin = document.querySelectorAll('.prioEv');
  listaMin.forEach(function(miniatura) {
    miniatura.classList.remove("selected");
  });
  document.getElementById(img.id).classList.add('selected');
  document.getElementById('imagen_principal').src=img.src;
}

function selectImg2(img){
  let listaMin = document.querySelectorAll('.nextEv');
  listaMin.forEach(function(miniatura) {
    miniatura.classList.remove("selected");
  });
  document.getElementById(img.id).classList.add('selected');
  document.getElementById('imagen_principal2').src=img.src;
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
      }
      else{
        i=0
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
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
      }
      else if(i==0){
        i=listaMin.length-1
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal').src=listaMin[i].src;
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
      }
      else{
        i=0
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
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
      }
      else if(i==0){
        i=listaMin.length-1
        listaMin[i].classList.add("selected");
        document.getElementById('imagen_principal2').src=listaMin[i].src;
      }
    }
  }
});
