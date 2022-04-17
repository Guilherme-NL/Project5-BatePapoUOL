let userName;
let userNameInput;
let userSelected;
let selectedContact;
let selectedUser = { name: "Todos" };
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
    scroll();
  }, 3000);
}

function getUsers() {
  setInterval(function () {
    axios
      .get("https://mock-api.driven.com.br/api/v6/uol/participants")
      .then(usersResponse);
  }, 10000);
}

function sendMessage() {
  const from = userNameInput;
  const to = document.querySelector(".selectedContact > div > p").innerHTML;
  const text = document.querySelector("#sendText").value;
  const type =
    document.querySelector(".selectedVisibility > div > p").innerHTML ===
    "Público"
      ? "message"
      : "private_message";
  const sendMessage = { from, to, text, type };
  axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", sendMessage);
  document.querySelector("#sendText").value = "Escreva aqui...";
  getMessage();
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
    if (messages[i].to === userNameInput) {
      if (messages[i].type === "private_message") {
        message.innerHTML += `
          <div class="pink-back">
            <span class="font-grey">(${messages[i].time})</span>&nbsp<span class="strong">${messages[i].from}</span>&nbsp
            para &nbsp<span class="strong">${messages[i].to}</span>:&nbsp<span>${messages[i].text}</span>
          </div>
          `;
      }
    }
  }
}

function usersResponse(response) {
  let usersOnline = response.data;
  let userOnline = document.querySelector(".contacts");
  if (!usersOnline.some((e) => e.name === selectedUser.name)) {
    selectedUser.name = "Todos";
  }
  if (selectedUser.name === "Todos") {
    userOnline.innerHTML = `
    <div class="all selectedContact" onclick="selectContact(this)">
      <div>
        <ion-icon name="people"></ion-icon>
        <p>Todos</p>
      </div>
      <div>
        <ion-icon class="check hide" name="checkmark-sharp"></ion-icon>
      </div>
    </div>
    `;
  } else {
    userOnline.innerHTML = `
    <div class="all" onclick="selectContact(this)">
      <div>
        <ion-icon name="people"></ion-icon>
        <p>Todos</p>
      </div>
      <div>
        <ion-icon class="check hide" name="checkmark-sharp"></ion-icon>
      </div>
    </div>
    `;
  }

  for (let i = 1; i < usersOnline.length; i++) {
    if (selectedUser.name === usersOnline[i].name) {
      userOnline.innerHTML += `
      <div class="userOnline selectedContact" onclick="selectContact(this)">
        <div>
          <ion-icon name="person-circle"></ion-icon>
          <p>${usersOnline[i].name}</p>
        </div>
        <div>
          <ion-icon class="check hide" name="checkmark-sharp"></ion-icon>
        </div>
      </div>
    `;
    } else {
      userOnline.innerHTML += `
      <div class="userOnline" onclick="selectContact(this)">
        <div>
          <ion-icon name="person-circle"></ion-icon>
          <p>${usersOnline[i].name}</p>
        </div>
        <div>
          <ion-icon class="check hide" name="checkmark-sharp"></ion-icon>
        </div>
      </div>
  `;
    }
  }
}

function scroll() {
  document.querySelector(".msg-box > div:last-child")?.scrollIntoView();
}

function handleEnterClick() {
  userNameInput = document.querySelector("#userNameInput").value;
  userRequest(userNameInput);
  getMessage();
  getUsers();
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
  selectedContact = document.querySelector(".selectedContact");
  if (selectedContact !== null) {
    selectedContact.classList.remove("selectedContact");
  }
  userSelected = el.classList.add("selectedContact");
  selectedUser.name = document.querySelector(
    ".selectedContact > div > p"
  ).innerHTML;
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
