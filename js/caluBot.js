const CALU_CHAT = "http://localhost:3000/preguntarCalubot";
let chatID = 0;

async function sendMessage(mensaje) {
  const message = mensaje;

  return fetch(CALU_CHAT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.caluAnswer);
      const answer = data.caluAnswer.content;
      return answer
    })
    .catch(error => console.error(error));
}


// CaluBot Escribiendo:
function typeWriter(texto, elementoTexto) {
  const textToWrite = texto;
  const textElement = elementoTexto;

  let index = 0;
  let typingInterval = setInterval(function () {
    textElement.textContent += textToWrite[index];
    index++;

    if (index >= textToWrite.length) {
      clearInterval(typingInterval);
    }
  }, 30); // Velocidad de aparición de cada letra (en milisegundos)
}

function containerCreator(chatID) {
  const msjContainer = `
            <div class="row justify-content-center p-2 border-bottom border-2 border-light" id=${chatID}>
              <div class="col-md-1">
                <img src="" alt="userIco" class="rounded-circle" style="width:60px;" id="img-${chatID}">
              </div>
              <div class="col-md-8 py-3">
                <p class="m-0" id="text-${chatID}"></p>
              </div>
            </div>
  `;
  document.getElementById("chatScreen").innerHTML += msjContainer;
  document.getElementById(chatID).scrollIntoView({ behavior: 'smooth' }); //Hacer foco a nueva entrada del chat

  return
}

function newUserChat(text){
  let newID = chatID++
  containerCreator(newID);

  document.getElementById(`img-${newID}`).src = "images/logo-tamers.png";
  document.getElementById(`text-${newID}`).textContent = text;

  return
}

function newCaluChat(text){
  let newID = chatID++
  containerCreator(newID);

  document.getElementById(`img-${newID}`).src = "images/icoCalu.png";
  const textElement = document.getElementById(`text-${newID}`);
  typeWriter(text, textElement);

  return
}


document.addEventListener("DOMContentLoaded", function () {

  const askInput = document.getElementById("AskInput");
  const askButton = document.getElementById("AskBtn");
  askInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askButton.click();
    }
  });

  askButton.addEventListener("click", async function () {

    const newMess = askInput.value;
    askInput.value = "";
    newUserChat(newMess);

    const answer = await sendMessage(newMess);
    newCaluChat(answer);

  });
});
