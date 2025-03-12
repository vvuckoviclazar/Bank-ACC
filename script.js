"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const singUp = document.querySelector(".singUp");
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".hidden-2");
const singUpBtn = document.querySelector(".singUp-Btn");
const backToLogin = document.querySelector(".backToLogin");
const newName = document.querySelector(".name");
const newEmail = document.querySelector(".newEmail");
const newPassword = document.querySelector(".newPassword");

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

  if (!newEmail.value.includes("@")) {
    alert("Invalid email! Email must contain '@'.");
    return;
  }

  if (newPassword.value.length < 4) {
    alert("Password must be at least 4 characters!");
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

  if (!manager.accounts.some((acc) => acc.getEmail() === enteredEmail)) {
    alert("Email is not correct!");
    return;
  }

  if (!manager.accounts.some((acc) => acc.getPassword() === enteredPassword)) {
    alert("Password is not correct!");
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
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});
