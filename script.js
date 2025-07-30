const balanceEl = document.getElementById("balance-amount");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("past-transactions");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function newTransaction(e) {
    e.preventDefault();
    const d = description.value.trim();
    const a = amount.value.trim();

    if (d === '' || a === '') {
        alert('Please enter a description and amount.');
        return;
    }

    const transaction = {
        id: Date.now(),
        text: d,
        amount: parseFloat(a),
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();

    description.value = '';
    amount.value = '';
}

function removeTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    updateLocalStorage();
    renderTransactions();
}

function updateSummary() {
    const amounts = transactions.map((t) => t.amount);
    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = (amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

    balanceEl.innerText = `$${total}`;
    incomeEl.innerText = `$${income}`;
    expenseEl.innerText = `$${expense}`;
}

function renderTransactions() {
    list.innerHTML = '';
    transactions.forEach((t) => {
        const sign = t.amount < 0 ? '-' : '+';
        const li = document.createElement('li');
        li.classList.add(t.amount < 0 ? 'minus' : 'plus');
        li.innerHTML = `
            ${t.text} (${t.date})
            <span>${sign}$${Math.abs(t.amount).toFixed(2)}<span>
            <button class="delete-btn" data-id="${t.id}">x</button>
        `;
        list.appendChild(li);
    });
    updateSummary();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.dataset.id);
        removeTransaction(id);
    }
});

function init() {
    renderTransactions();
}
init();

form.addEventListener('submit', newTransaction);
