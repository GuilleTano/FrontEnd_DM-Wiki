const corsAnywhere = "https://cors-anywhere.herokuapp.com/"; //URL de un API para redireccionar la URL original y asi no tener problemas de CORS
//Parece que el acceso al servidor de corsAnywhere es temporal, hay que buscar otra solucion
const DIGIMON_URL = "https://www.digi-api.com/api/v1/digimon/";

let getJSONData = function(url){
    let result = {};
    return fetch(corsAnywhere + url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}


/*
function getJSONData(url){
    let resultado = {};
    return fetch(url)
    .then(respuesta => respuesta.json())
    .then(function(respuesta) {
        resultado.status = 'ok';
        resultado.data = respuesta;
        return resultado;
    })
    .catch(error => alert("Sucedió un Digi-error" + error));
}
*/