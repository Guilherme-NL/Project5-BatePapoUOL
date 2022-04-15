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
  setInterval(function () {
    axios
      .get("https://mock-api.driven.com.br/api/v6/uol/messages")
      .then(processResponse);
  }, 3000);
}

function sendMessage() {
  const from = userNameInput;
  const to = "Todos";
  const text = document.querySelector("#sendText").value;
  const type = "message";
  const sendMessage = { from, to, text, type };
  axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", sendMessage);
  document.querySelector("#sendText").value = "Escreva aqui...";
}

function processResponse(response) {
  const messages = response.data;
  let message = document.querySelector(".msg-box");
  message.innerHTML = "";
  for (let i = 1; i < messages.length; i++) {
    if (messages[i].type === "status") {
      message.innerHTML += `
        <div class="gray-back">
          <span class="font-grey">(${messages[i].time})</span>&nbsp<span class="strong">${messages[i].from}</span>&nbsp
          para &nbsp<span class="strong">${messages[i].to}</span>:&nbsp<span>${messages[i].text}</span>
        </div>
        `;
    }
    if (messages[i].type === "message") {
      message.innerHTML += `
        <div class="white-back">
          <span class="font-grey">(${messages[i].time})</span>&nbsp<span class="strong">${messages[i].from}</span>&nbsp
          para &nbsp<span class="strong">${messages[i].to}</span>:&nbsp<span>${messages[i].text}</span>
        </div>
        `;
    }
  }
}

function handleEnterClick() {
  userNameInput = document.querySelector("#userNameInput").value;
  userRequest(userNameInput);
  getMessage();
  defaultSetting();
}
function defaultSetting() {
  document.querySelector(".all").classList.add("selectedContact");
  document.querySelector(".public").classList.add("selectedVisibility");
}

function showSideBar() {
  document.querySelector(".opacity").classList.remove("hide");
  document.querySelector(".side-bar").classList.remove("hide");
}
function hideSideBar() {
  document.querySelector(".opacity").classList.add("hide");
  document.querySelector(".side-bar").classList.add("hide");
}

function selectContact(el) {
  const selectedContact = document.querySelector(".selectedContact");
  if (selectedContact !== null) {
    selectedContact.classList.remove("selectedContact");
  }
  el.classList.add("selectedContact");
}

function selectVisibility(el) {
  const selectedVisibility = document.querySelector(".selectedVisibility");
  if (selectedVisibility !== null) {
    selectedVisibility.classList.remove("selectedVisibility");
  }
  el.classList.add("selectedVisibility");
}

function clearInputName() {
  document.querySelector("#userNameInput").value = "";
}
function clearInputText() {
  document.querySelector("#sendText").value = "";
}
