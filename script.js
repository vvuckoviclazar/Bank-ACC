"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const form = document.querySelector("form");
const singUp = document.querySelector(".singUp");

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
const acc1 = new Account();
manager.addAcc(acc1);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

singUp.addEventListener("click", (e) => {
  form.innerHTML = `<form class="newAcc">
    <h1>Singup</h1>
       <div class="formDiv">
          <label for="name">name:</label>
          <input
            type="text"
            class="name"
            required
          />
        </div>
     
<div class="formDiv">
          <label for="newEmail">email:</label>
          <input
            type="text"
            class="newEmail"
            required
          />
        </div>
        <div class="formDiv">
          <label for="newPassword">password:</label>
          <input
            type="text"
            class="newPassword"
            required
          />
        </div>
      <button class="singUp-Btn" type="submit">Singup</button>


  </form>`;
});
