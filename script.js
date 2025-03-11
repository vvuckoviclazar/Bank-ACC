"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const singUp = document.querySelector(".singUp");
const loginForm = document.querySelector(".hidden-1");
const signupForm = document.querySelector(".hidden-2");
const singUpBtn = document.querySelector(".singUp-Btn");
const backToLogin = document.querySelector(".backToLogin");

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

singUp.addEventListener("click", () => {
  loginForm.classList.add("hidden-2");
  signupForm.classList.remove("hidden-2");
});

singUpBtn.addEventListener("click", (e) => {
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});

backToLogin.addEventListener("click", (e) => {
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});
