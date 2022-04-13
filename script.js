// let chat = [];

// function serverChat() {
//   const promise = axios.get("");
//   console.log(promise);
//   //callback
//   promise.then(dataLoad);
// }
// function dataLoad(response) {
//   console.log(response.data);
//   chat = response.data;
//   renderizarChat();
// }

// //puxar o nome e a msg que foi escrita no campo
// const name = document.querySelector("").value;
// const message = document.querySelector(".bottom-bar > input").value;
// const newMessage = { name: name, message: message };

//enviar msg para a api - depois tem puxar para o app novamente

//executar depois que a promise for resolvida
//promise.then(serverChat);
// let promise = axios.get(
//   "https://mock-api.driven.com.br/api/v6/uol/participants"
// );
//request username
let userName;
let userNameInput;
function userRequest(name) {
  userName = {
    name,
  };
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)
    .then(keepConnection)
    .catch(changeName);
}

function keepConnection() {
  document.querySelector(".entry-screen").classList.add("hide");
  setInterval(function () {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName);
  }, 4000);
}

function changeName(error) {
  if (error.response.status === 400) {
    document.querySelector(".input-name > p").innerHTML =
      "The username already exists";
  }
}

function getMessage() {
  axios.get("http://mock-api.driven.com.br/api/v6/uol/messages");
}

function handleEnterClick() {
  userNameInput = document.querySelector("#userNameInput").value;
  userRequest(userNameInput);
}
