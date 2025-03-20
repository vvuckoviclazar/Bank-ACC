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
const errorSpan = document.querySelector(".errorSpan");
const singUpSpan1 = document.querySelector(".singUp-span1");
const singUpSpan2 = document.querySelector(".singUp-span2");
const singUpSpan3 = document.querySelector(".singUp-span3");
const nameBtn = document.querySelector(".nameBtn");
const emailBtn = document.querySelector(".emailBtn");
const passwordBtn = document.querySelector(".passwordBtn");
const accList = document.querySelector(".accList");
const helloMessage = document.querySelector(".hello");
const incomeSpan = document.querySelector(".incomeSpan");
const deductionSpan = document.querySelector(".deductionSpan");
const totalSpan = document.querySelector(".totalSpan");
const sortPlus = document.querySelector(".sortPlus");
const sortMinus = document.querySelector(".sortMinus");
const listContainer = document.querySelector(".list-container");
const errorDiv = document.querySelector(".errorDiv");
const errorDiv2 = document.querySelector(".errorDiv2");

const testAccounts = [
  {
    owner: "Lazar Vuckovic",
    email: "lazarv@gmail.com",
    password: "1234",
    pin: 1111,
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  },
  {
    owner: "Nemanja Malesija",
    email: "nemanja@gmail.com",
    password: "1234",
    pin: 2222,
    movements: [500, -200, 340, -300, -20, 50, 400, -460],
  },
];

let currentAccount;
let enteredEmail;
let enteredPassword;

emailInput.addEventListener("input", (e) => {
  enteredEmail = e.target.value;
});

passwordInput.addEventListener("input", (e) => {
  enteredPassword = e.target.value;
});

class Account {
  constructor(name, email, password, movements = []) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.movements = movements;
  }

  getMovements() {
    return this.movements;
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
    this.accounts = testAccounts.map(
      (acc) => new Account(acc.owner, acc.email, acc.password, acc.movements)
    );
  }

  addAcc(account) {
    this.accounts.push(account);
  }

  findAcc(email, password) {
    return this.accounts.find(
      (acc) => acc.getEmail() === email && acc.getPassword() === password
    );
  }

  sortMovements(account, sortType) {
    let movements = [...account.getMovements()];

    if (sortType === "asc") {
      return movements.sort((a, b) => a - b);
    } else if (sortType === "desc") {
      return movements.sort((a, b) => b - a);
    } else {
      return movements;
    }
  }

  getTotalIncome(account) {
    return account
      .getMovements()
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getTotalDeductions(account) {
    return account
      .getMovements()
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getTotalBalance(account) {
    return this.getTotalIncome(account) + this.getTotalDeductions(account);
  }
}

const manager = new AccManager();

function createLoginNotification(text) {
  errorDiv.innerHTML = `<span class="errorSpan">${text}</span>`;
}

function createSignupNotification(text) {
  errorDiv2.innerHTML = `
    <span class="singUp-span2">
      ${text}
      <button class="spanBtn ">x</button>
    </span>
  `;
}

function displayMovements(account, sortType = "default") {
  accList.innerHTML = "";

  const movements = manager.sortMovements(account, sortType);

  manager.getTotalIncome(account);
  manager.getTotalDeductions(account);
  manager.getTotalBalance(account);

  incomeSpan.textContent = `${manager.getTotalIncome(account)}`;
  deductionSpan.textContent = `${manager.getTotalDeductions(account)}`;
  totalSpan.textContent = `${manager.getTotalBalance(account)}`;

  movements.forEach((mov) => {
    const type = mov < 0 ? "deduction" : "income";
    const li = document.createElement("li");
    li.classList.add("movement", `movement--${type}`);

    li.innerHTML = `
      <span class="mov-value">${mov}</span> 
      <span class="mov-type">${type}</span>
    `;

    const movTypeSpan = li.querySelector(".mov-type");
    movTypeSpan.style.backgroundColor =
      type === "income" ? "rgb(74, 198, 74)" : "rgb(218, 70, 70)";

    accList.appendChild(li);
  });
}

sortPlus.addEventListener("click", () => {
  if (currentAccount) {
    displayMovements(currentAccount, "desc");
  }
});

sortMinus.addEventListener("click", () => {
  if (currentAccount) {
    displayMovements(currentAccount, "asc");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  errorDiv2.innerHTML = "";

  if (newName.value.trim() === "") {
    createSignupNotification("The name field is required.");
    // createErrorNoticifation("error", "text")
    return;
  }

  if (!newEmail.value.includes("@")) {
    createSignupNotification("Invalid email! Email must contain '@'.");
    return;
  }

  if (newPassword.value.length < 4) {
    createSignupNotification("Password must be at least 4 characters!");
    return;
  }

  const newAccount = new Account(
    newName.value,
    newEmail.value,
    newPassword.value
  );

  manager.addAcc(newAccount);

  newName.value = "";
  newEmail.value = "";
  newPassword.value = "";

  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // ideja je osloboditi se varijavle currentAcc to jest prebaciti je u menager
  currentAccount = manager.findAcc(enteredEmail, enteredPassword);

  if (!currentAccount) {
    createLoginNotification("Incorrect email or password!");

    setTimeout(() => {
      errorDiv.innerHTML = "";
    }, 3000);

    return;
  }

  if (currentAccount) {
    loginForm.classList.add("hidden-2");
    listContainer.classList.remove("hidden-list");
    helloMessage.textContent = `Hi ${currentAccount.getName()}`;
    displayMovements(currentAccount);
  }
});

singUp.addEventListener("click", () => {
  loginForm.classList.add("hidden-2");
  signupForm.classList.remove("hidden-2");
});

backToLogin.addEventListener("click", (e) => {
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
  listContainer.classList.add("hidden-list");
});

errorDiv2.addEventListener("click", (e) => {
  if (e.target.classList.contains("spanBtn")) {
    errorDiv2.innerHTML = "";
  }
});

// napravi funkciju create notification
// ona ce da primi dva argumenta
// prvi ce da bude type (moze da bude error i succses)
// drugi argument ce da bude notification text
