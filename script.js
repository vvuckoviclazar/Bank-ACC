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
const transferBtn = document.querySelector(".transferBtn");
const toInput = document.querySelector(".to");
const amountInput = document.querySelector(".amount");

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

  addMovement(amount) {
    this.movements.push(amount);
  }

  getTotalBalance() {
    return this.movements.reduce((acc, mov) => acc + mov, 0);
  }
}

class AccManager {
  constructor() {
    this.accounts = testAccounts.map(
      (acc) => new Account(acc.owner, acc.email, acc.password, acc.movements)
    );
    this.currentAccount = null;
  }

  addAcc(account) {
    this.accounts.push(account);
  }

  findAcc(email, password) {
    const account = this.accounts.find(
      (acc) => acc.getEmail() === email && acc.getPassword() === password
    );

    if (account) {
      this.currentAccount = account;
    }

    return account;
  }

  getCurrentAccount() {
    return this.currentAccount;
  }

  sortMovements(sortType) {
    if (!this.currentAccount) return [];

    let movements = [...this.currentAccount.getMovements()];

    if (sortType === "asc") {
      return movements.sort((a, b) => a - b);
    } else if (sortType === "desc") {
      return movements.sort((a, b) => b - a);
    } else {
      return movements;
    }
  }

  getTotalIncome() {
    if (!this.currentAccount) return 0;

    return this.currentAccount
      .getMovements()
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getTotalDeductions() {
    if (!this.currentAccount) return 0;

    return this.currentAccount
      .getMovements()
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getTotalBalance() {
    return this.getTotalIncome() + this.getTotalDeductions();
  }
}

class TransactionManager {
  constructor(accountManager) {
    this.accountManager = accountManager;
  }

  transferMoney(toEmail, amount) {
    if (!this.accountManager.getCurrentAccount()) return;

    const sender = this.accountManager.getCurrentAccount();
    const receiver = this.accountManager.accounts.find(
      (acc) => acc.getEmail() === toEmail
    );
    const transferAmount = amount * 1;

    if (
      !receiver ||
      isNaN(transferAmount) ||
      transferAmount <= 0 ||
      sender.getTotalBalance() < transferAmount
    )
      return;

    sender.addMovement(-transferAmount);
    receiver.addMovement(transferAmount);

    displayMovements();
  }
}

const manager = new AccManager();
const transactionManager = new TransactionManager(manager);

transferBtn.addEventListener("click", () => {
  const toEmail = toInput.value.trim();
  const amount = amountInput.value.trim();

  transactionManager.transferMoney(toEmail, amount);
});

function renderMovements(movements, container) {
  container.innerHTML = "";

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

    container.appendChild(li);
  });
}

function createNotification(type, text, target, isRemovable) {
  if (type === "error") {
    let targetDiv = target === "login" ? errorDiv : errorDiv2;

    targetDiv.innerHTML = `
      <span class="${target === "signup" ? "singUp-span2" : "errorSpan"}">
        ${text} 
        ${isRemovable ? '<button class="spanBtn">x</button>' : ""}
      </span>
    `;

    if (!isRemovable) {
      setTimeout(() => {
        targetDiv.innerHTML = "";
      }, 3000);
    }
  }
}

function displayMovements(sortType = "default") {
  accList.innerHTML = "";

  const movements = manager.sortMovements(sortType);

  incomeSpan.textContent = `${manager.getTotalIncome()}`;
  deductionSpan.textContent = `${manager.getTotalDeductions()}`;
  totalSpan.textContent = `${manager.getTotalBalance()}`;

  renderMovements(movements, accList);
}

sortPlus.addEventListener("click", () => {
  if (manager.getCurrentAccount()) {
    displayMovements("desc");
  }
});

sortMinus.addEventListener("click", () => {
  if (manager.getCurrentAccount()) {
    displayMovements("asc");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  errorDiv2.innerHTML = "";

  if (newName.value.trim() === "") {
    createNotification("error", "The name field is required.", "signup", true);
    return;
  }

  if (!newEmail.value.includes("@")) {
    createNotification(
      "error",
      "Invalid email! Email must contain '@'.",
      "signup",
      true
    );
    return;
  }

  if (newPassword.value.length < 4) {
    createNotification(
      "error",
      "Password must be at least 4 characters!",
      "signup",
      true
    );
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

  manager.findAcc(enteredEmail, enteredPassword);

  if (!manager.getCurrentAccount()) {
    createNotification("error", "Incorrect email or password!", "login", false);

    setTimeout(() => {
      errorDiv.innerHTML = "";
    }, 3000);
    return;
  }

  loginForm.classList.add("hidden-2");
  listContainer.classList.remove("hidden-list");
  helloMessage.textContent = `Hi ${manager.getCurrentAccount().getName()}`;
  displayMovements();
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
