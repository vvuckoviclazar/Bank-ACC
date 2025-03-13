"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const singUp = document.querySelector(".singUp");
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".newAcc");
const singUpBtn = document.querySelector(".singUp-Btn");
const backToLogin = document.querySelector(".backToLogin");
const newName = document.querySelector(".name");
const newEmail = document.querySelector(".newEmail");
const newPassword = document.querySelector(".newPassword");
const loginSpan = document.querySelector(".loginSpan");
const singUpSpan1 = document.querySelector(".singUp-span1");
const singUpSpan2 = document.querySelector(".singUp-span2");
const singUpSpan3 = document.querySelector(".singUp-span3");
const nameBtn = document.querySelector(".nameBtn");
const emailBtn = document.querySelector(".emailBtn");
const passwordBtn = document.querySelector(".passwordBtn");

let enteredEmail;
let enteredPassword;

emailInput.addEventListener("input", (e) => {
  enteredEmail = e.target.value;
});

passwordInput.addEventListener("input", (e) => {
  enteredPassword = e.target.value;
});

class Account {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}

class AccManager {
  constructor() {
    this.accounts = [];
  }

  addAcc(account) {
    this.accounts.push(account);
  }

  findAcc(email, password) {
    return this.accounts.find(
      (acc) => acc.getEmail() === email && acc.getPassword() === password
    );
  }
}

const manager = new AccManager();

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  singUpSpan1.classList.add("hidden-span2");
  singUpSpan2.classList.add("hidden-span3");
  singUpSpan3.classList.add("hidden-span4");

  if (newName.value.trim() === "") {
    singUpSpan3.classList.remove("hidden-span4");
  }

  if (!newEmail.value.includes("@")) {
    singUpSpan1.classList.remove("hidden-span2");
  }

  if (newPassword.value.length < 4) {
    singUpSpan2.classList.remove("hidden-span3");
  }

  if (
    newName.value.trim() === "" ||
    !newEmail.value.includes("@") ||
    newPassword.value.length < 4
  ) {
    return;
  }

  const newAccount = new Account(
    newName.value,
    newEmail.value,
    newPassword.value
  );
  manager.addAcc(newAccount);
  console.log("Account added:", newAccount);
  console.log("All accounts:", manager.accounts);

  newName.value = "";
  newEmail.value = "";
  newPassword.value = "";

  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const account = manager.findAcc(enteredEmail, enteredPassword);

  if (!account) {
    loginSpan.classList.remove("hidden-span");
    setTimeout(() => {
      loginSpan.classList.add("show-span");
    }, 10);

    setTimeout(() => {
      loginSpan.classList.remove("show-span");
      setTimeout(() => {
        loginSpan.classList.add("hidden-span");
      }, 500);
    }, 3000);

    return;
  }

  if (account) {
    document.body.innerHTML = `<h1 class="hello">Hello, ${account.getName()}!</h1>`;
  }
});

singUp.addEventListener("click", () => {
  loginForm.classList.add("hidden-2");
  signupForm.classList.remove("hidden-2");
});

backToLogin.addEventListener("click", (e) => {
  singUpSpan1.classList.add("hidden-span2");
  singUpSpan2.classList.add("hidden-span3");
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});

nameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  singUpSpan3.classList.add("hidden-span4");
});

emailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  singUpSpan1.classList.add("hidden-span2");
});

passwordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  singUpSpan2.classList.add("hidden-span3");
});

// napravi funkciju create notification
// ona ce da primi dva argumenta
// prvi ce da bude type (moze da bude error i succses)
// drugi argument ce da bude notification text
