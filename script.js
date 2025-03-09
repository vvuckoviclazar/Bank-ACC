"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const form = document.querySelector("form");
const singUp = document.querySelector(".singUp");

//trebace mi dve klase jedna se zoce account a druga accManager
//iskoristi accounts array da napravis acccountove
//primer new Account(accounts[0].name)
//ovo bolje moze da se napravi preko petlje

const accounts = [
  { name: "Lazar Vuckovic", email: "lazarv@gmail.com", password: "123" },
  { name: "Nemanja Malesija", email: "nemanjam@gmail.com", password: "321" },
];

let enteredEmail;
let enteredPassword;

emailInput.addEventListener("input", (e) => {
  enteredEmail = e.target.value;
});

passwordInput.addEventListener("input", (e) => {
  enteredPassword = e.target.value;
});

class Account {
  constructor(name, email, password) {}
}

class AccManager {
  constructor() {
    this.accounts = [];
  }

  addAcc(account) {
    this.accounts.push(account);
  }
}

const manager = new AccManager();
const acc1 = new Account();
manager.addAcc(acc1);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!enteredEmail || !enteredPassword) {
    alert("Please enter both email and password.");
    return;
  }
  // proveri ima li ovaj input u accManager array
  const check = new accChecker(enteredEmail, enteredPassword);

  if (check.isAuthenticated()) {
    form.innerHTML = `<h1>Hello ${check.getName()}</h1>`;
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

singUp.addEventListener("click", (e) => {
  form.innerHTML = `<form class="newAcc">
    <h1>Singup</h1>
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
        <div class="formDiv">
          <label for="confirmPassword">confirm password:</label>
          <input
            type="text"
            class="confirmPassword"
            required
          />
        </div>
      <button class="singUp-Btn" type="submit">Singup</button>


  </form>`;
});
