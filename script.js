// === Element References ===
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');
const listEl = document.getElementById('transaction-list');
const formEl = document.getElementById('form');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');

// === Load Transactions from localStorage ===
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// === Add Transaction ===
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value.trim();
  const amount = amountEl.value.trim();

  if (description === '' || amount === '') {
    alert('Please enter a description and amount.');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: description,
    amount: parseFloat(amount),
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  
  // Clear inputs
  descriptionEl.value = '';
  amountEl.value = '';
}

// === Remove Transaction ===
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

// === Update Summary (Balance, Income, Expenses) ===
function updateSummary() {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((val) => val < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balanceEl.innerText = `$${total}`;
  incomeEl.innerText = `+$${income}`;
  expenseEl.innerText = `-$${expense}`;
}

// === Render Transaction List ===
function renderTransactions() {
  listEl.innerHTML = '';

  transactions.forEach((t) => {
    const sign = t.amount < 0 ? '-' : '+';

    const li = document.createElement('li');
    li.classList.add(t.amount < 0 ? 'minus' : 'plus');
    li.innerHTML = `
      ${t.text} 
      <span>${sign}$${Math.abs(t.amount).toFixed(2)}</span>
      <button class="delete-btn" data-id="${t.id}">x</button>
    `;

    listEl.appendChild(li);
  });

  updateSummary();
}

// === Save to localStorage ===
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// === Handle Delete Click (Event Delegation) ===
listEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.dataset.id);
    removeTransaction(id);
  }
});

// === Initialize ===
function init() {
  renderTransactions();
}

init();

// === Form Submit Listener ===
formEl.addEventListener('submit', addTransaction);
