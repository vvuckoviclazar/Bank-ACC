"use strict";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const singUp = document.querySelector(".singUp");
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".newAcc");
const singUpBtn = document.querySelector(".singUp-Btn");
const backToLogin = document.querySelector(".backToLogin");
const backToLogin2 = document.querySelector(".backToLogin2");
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
const requestAmountInput = document.querySelector(".requestAmount");
const requestBtn = document.querySelector(".requestBtn");
const closeBtn = document.querySelector(".closeBtn");
const closeEmailInput = document.querySelector(".closeEmail");
const closePasswordInput = document.querySelector(".closePassword");
const confirmClosePassInput = document.querySelector(".confirmClosePass");
const transferNotificationDiv = document.querySelector(
  ".transfer-notification"
);

const testAccounts = [
  {
    owner: "Lazar Vuckovic",
    email: "lazarv@gmail.com",
    password: "1234",
    pin: 1111,
    movements: [
      { value: 200, date: "12.03.2025" },
      { value: 450, date: "13.03.2025" },
      { value: -400, date: "14.03.2025" },
      { value: 3000, date: "15.03.2025" },
      { value: -650, date: "16.03.2025" },
      { value: -130, date: "17.03.2025" },
      { value: 70, date: "18.03.2025" },
      { value: 1300, date: "19.03.2025" },
    ],
  },
  {
    owner: "Nemanja Malesija",
    email: "nemanja@gmail.com",
    password: "1234",
    pin: 2222,
    movements: [
      { value: 500, date: "12.03.2025" },
      { value: -200, date: "13.03.2025" },
      { value: 340, date: "14.03.2025" },
      { value: -300, date: "15.03.2025" },
      { value: -20, date: "16.03.2025" },
      { value: 50, date: "17.03.2025" },
      { value: 400, date: "18.03.2025" },
      { value: -460, date: "19.03.2025" },
    ],
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

class Movement {
  constructor(value) {
    this.value = value;
    this.date = new Date().toLocaleDateString("de-DE").replace(/\//g, ".");
  }

  getValue() {
    return this.value;
  }

  getDate() {
    return this.date;
  }

  isIncome() {
    return this.value > 0;
  }

  isDeduction() {
    return this.value < 0;
  }
}

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
    const movement = new Movement(amount);
    this.movements.unshift(movement);
  }

  getTotalBalance() {
    return this.movements.reduce((acc, mov) => acc + mov.getValue(), 0);
  }
}

class AccManager {
  constructor() {
    this.accounts = testAccounts.map((acc) => {
      const movementInstances = acc.movements.map(
        (mov) => new Movement(mov.value)
      );
      return new Account(acc.owner, acc.email, acc.password, movementInstances);
    });
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
      return movements.sort((a, b) => a.getValue() - b.getValue());
    } else if (sortType === "desc") {
      return movements.sort((a, b) => b.getValue() - a.getValue());
    } else {
      return movements;
    }
  }

  getTotalIncome() {
    if (!this.currentAccount) return 0;
    return this.currentAccount
      .getMovements()
      .filter((mov) => mov.isIncome())
      .reduce((acc, mov) => acc + mov.getValue(), 0);
  }

  getTotalDeductions() {
    if (!this.currentAccount) return 0;
    return this.currentAccount
      .getMovements()
      .filter((mov) => mov.isDeduction())
      .reduce((acc, mov) => acc + Math.abs(mov.getValue()), 0);
  }

  getTotalBalance() {
    if (!this.currentAccount) return 0;
    return this.currentAccount
      .getMovements()
      .reduce((acc, mov) => acc + mov.getValue(), 0);
  }

  transferMoney(toEmail, amount) {
    if (!this.currentAccount) return;

    const sender = this.currentAccount;
    const receiver = this.accounts.find((acc) => acc.getEmail() === toEmail);
    const transferAmount = Number(amount);
    transferNotificationDiv.innerHTML = "";

    if (!receiver || receiver === sender) {
      const notif = showTransferNotification("error", "Invalid email.");
      transferNotificationDiv.appendChild(notif);
      return;
    }

    const currentBalance = sender
      .getMovements()
      .reduce((acc, mov) => acc + mov.getValue(), 0);

    if (
      isNaN(transferAmount) ||
      transferAmount <= 0 ||
      currentBalance < transferAmount
    ) {
      const notif = showTransferNotification(
        "error",
        "Not enough balance to complete transfer."
      );
      transferNotificationDiv.appendChild(notif);
      return;
    }

    const outMovement = new Movement(-transferAmount);
    const inMovement = new Movement(transferAmount);

    sender.movements.unshift(outMovement);
    receiver.movements.unshift(inMovement);

    const notif = showTransferNotification(
      "success",
      `Successfully transferred $${transferAmount} to ${receiver.getName()}`
    );
    transferNotificationDiv.appendChild(notif);

    displayMovements();
  }

  requestLoan(amount) {
    if (!this.currentAccount) return;

    const loanAmount = Number(amount);
    if (isNaN(loanAmount) || loanAmount <= 0) return;

    const loanMovement = new Movement(loanAmount);
    this.currentAccount.movements.unshift(loanMovement);

    displayMovements();
  }

  closeAccount(email, password, confirmPassword) {
    if (!this.currentAccount) return;

    const currentAccount = this.currentAccount;

    if (
      email !== currentAccount.getEmail() ||
      password !== currentAccount.getPassword() ||
      password !== confirmPassword
    ) {
      return;
    }

    this.accounts = this.accounts.filter((acc) => acc.getEmail() !== email);
    this.currentAccount = null;

    listContainer.classList.add("hidden-list");
    loginForm.classList.remove("hidden-2");
  }
}

const manager = new AccManager();

transferBtn.addEventListener("click", () => {
  const toEmail = toInput.value.trim();
  const amount = amountInput.value.trim();

  manager.transferMoney(toEmail, amount);
});

requestBtn.addEventListener("click", () => {
  const loanAmount = requestAmountInput.value;
  manager.requestLoan(loanAmount);
});

closeBtn.addEventListener("click", () => {
  const email = closeEmailInput.value;
  const password = closePasswordInput.value;
  const confirmPassword = confirmClosePassInput.value;

  manager.closeAccount(email, password, confirmPassword);
});

function renderMovements(movements, container) {
  container.innerHTML = "";

  movements.forEach(({ value: money, date }) => {
    const type = money < 0 ? "deduction" : "income";

    const li = document.createElement("li");
    li.classList.add("movement", `movement--${type}`);

    li.innerHTML = `
      <span class="mov-value">${money}$</span> 
       <span class="mov-date">${date}</span>
      <span class="mov-type">${type}</span>
     `;

    const movTypeSpan = li.querySelector(".mov-type");
    movTypeSpan.style.backgroundColor =
      type === "income" ? "rgb(74, 198, 74)" : "rgb(218, 70, 70)";

    container.appendChild(li);
  });
}

function createNotification(type, text, isRemovable = false) {
  const span = document.createElement("span");

  span.classList.add("notification-span");

  if (type === "error") {
    span.classList.add("errorSpan");
  }

  if (isRemovable) {
    span.classList.add("removableSpan");
  }

  span.innerHTML = `
    ${text} 
    ${isRemovable ? '<button class="spanBtn">x</button>' : ""}
  `;

  if (!isRemovable) {
    setTimeout(() => {
      span.remove();
    }, 3000);
  }

  return span;
}

function showTransferNotification(status, message) {
  const span = document.createElement("span");
  span.classList.add("notification-span", "has-close-btn");

  if (status === "success") {
    span.classList.add("successSpan");
  } else if (status === "error") {
    span.classList.add("errorSpan");
  }

  span.innerHTML = `
    ${message}
    <button class="spanBtn">x</button>
  `;

  return span;
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
    const notif = createNotification(
      "error",
      "The name field is required.",
      true
    );
    errorDiv2.appendChild(notif);
    return;
  }

  if (!newEmail.value.includes("@")) {
    const notif = createNotification(
      "error",
      "Invalid email! Email must contain '@'.",
      true
    );
    errorDiv2.appendChild(notif);
    return;
  }

  if (newPassword.value.length < 4) {
    const notif = createNotification(
      "error",

      "Password must be at least 4 characters!",
      true
    );
    errorDiv2.appendChild(notif);
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
    const notif = createNotification(
      "error",
      "Incorrect email or password!",
      false
    );
    errorDiv.appendChild(notif);
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

backToLogin2.addEventListener("click", (e) => {
  signupForm.classList.add("hidden-2");
  loginForm.classList.remove("hidden-2");
  listContainer.classList.add("hidden-list");
});

errorDiv2.addEventListener("click", (e) => {
  if (e.target.classList.contains("spanBtn")) {
    e.target.parentElement.remove();
  }
});

transferNotificationDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("spanBtn")) {
    e.target.parentElement.remove();
  }
});
