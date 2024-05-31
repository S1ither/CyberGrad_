const main = document.getElementById("main");

const text = document.createElement("span");
text.textContent = "Добро пожаловать. Для работы войдите в систему Киберград";
text.classList.add("text", "text-black", "col-md-1");

const btn = document.createElement("button");
btn.textContent = "Войти";
btn.onclick = () => {
  modalSwitch()
}
btn.classList.add("btn", "btn-primary", "col-md-1");

const div = document.createElement("div");
div.classList.add("container", "text-center", "align-items-center");
div.append(text, document.createElement("br"), btn);

function cookieParser(cookieString) {
  if (cookieString === "")
      return {};
  let pairs = cookieString.split(";");

  let splittedPairs = pairs.map(cookie => cookie.split("="));

  const cookieObj = splittedPairs.reduce(function (obj, cookie) {

      obj[decodeURIComponent(cookie[0].trim())]
          = decodeURIComponent(cookie[1].trim());

      return obj;
  }, {})

  return cookieObj;
}

let dummyCookieString = document.cookie;

let cookieObj = cookieParser(dummyCookieString);

console.log(cookieObj);

if (false) {
  main.classList.add("d-flex")
  main.append(div);
}
else {
  
}
