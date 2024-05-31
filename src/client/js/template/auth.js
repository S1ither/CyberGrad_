const modalHeaderLog = `<h5 class="modal-title">Вход в систему КиберГрад</h5>
<button type="button" class="btn-close"></button>`;

const modalBodyLog = `<form id="logForm" action="https://localhost/api/auth" method="post">
<input class="form-control m-1" type="text" name="Login" id="login" placeholder="Login" autocomplete="off">
<input class="form-control m-1" type="password" name="password" id="password" placeholder="ExamplePassword">
</form>`;

const modalFooterLog = `<button type="button" class="btn btn-primary" id="logFormSub">Войти</button>
<button type="button" class="btn btn-secondary">Отмена</button>`;

let isLogin = false;

//document.cookie = "log=log; path=/; expires=True;"
//localStorage.getItem("log") ?? localStorage.setItem("log", "log");
console.log(localStorage);
console.log(document.cookie);

const modal = document.getElementById("modal");
const bLogin = document.getElementById("bLogin");
const bProfile = document.getElementById("bProfile");
const bExit = document.getElementById("bExit");

const objModal = {
  main: modal,
  header: modal.children[0].children[0].children[0],
  body: modal.children[0].children[0].children[1],
  footer: modal.children[0].children[0].children[2],
};

if (localStorage.getItem("log")) {
  bLogin.style.display = "none";
} else {
  bProfile.style.display = "none";
  bExit.style.display = "none";

  objModal.header.innerHTML = modalHeaderLog;
  objModal.body.innerHTML = modalBodyLog;
  objModal.footer.innerHTML = modalFooterLog;
}

const modalSwitch = () => {
  if (modal.classList.contains("show")) {
    setTimeout(() => modal.setAttribute("style", "display:none"), 500) &&
      modal.classList.remove("show");
  } else {
    setTimeout(() => modal.classList.add("show"), 500) &&
      modal.setAttribute("style", "display:block");
  }
};

document.onclick = (e) => {
  const withinModal = e.composedPath().includes(modal.children[0].children[0]);
  const withinBLogin = e.composedPath().includes(bLogin);

  if (modal.classList.contains("show") && !withinModal) {
    modalSwitch();
    return 0;
  }
  if (!modal.classList.contains("show") && withinBLogin) {
    modalSwitch();
    return 0;
  }
};

objModal.header.getElementsByClassName("btn-close")[0].onclick = () =>
  modalSwitch();
objModal.footer.getElementsByClassName("btn-secondary")[0].onclick = () =>
  modalSwitch();

document.getElementById("logFormSub").onclick = () => {
  fetch("https://localhost/api/auth", {
    method: "POST",
    body: new FormData(document.getElementById("logForm")),
    mode: "cors",
  }).then((req) => {
    console.log(req.status);
    req.json().then((res) => {
      console.log(res);
      localStorage.setItem("token", res.message);
      console.log(localStorage.getItem("token"));
    });
  });
};
