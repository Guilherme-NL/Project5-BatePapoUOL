let userName;
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
  const userNameInput = document.querySelector("#userNameInput").value;
  userRequest(userNameInput);
  getMessage();
}

function clearInput() {
  document.querySelector("#userNameInput").value = "";
}
