const balance = document.getElementById("balance-amount");
const income = document.getElementById("income-amount");
const expense = document.getElementById("expense-amount");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const add_button = document.getElementById("add-button")
const transaction_list = document.getElementById("transaction-list");



// Get description and mount
// Turn it into a list element

add_button.addEventListener("click", ()=> {
    const d = description.value.trim();
    const a = amount.value.trim();

    if (d === "" || a === "") {
        alert("Please fill out both fields!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = `${d}:$${parseFloat(amount).toFixed(2)}`;

    const delete_button = document.createElement("button");
    delete_button.textContent = "X";

    delete_button.addEventListener("click", ()=> {
        li.remove();
    })

    li.appendChild(delete_button);
    transaction_list.appendChild(li);

    const amt = parseFloat(a);
    const inc = parseFloat(income);
    const exp = parseFloat(expense);
    const bal = parseFloat(balance);

    if(a.startsWith("-")) {
        exp = exp + a;
    }
    else{
        inc = inc + a;
    }

    bal = exp + inc;

    balance.innerHTML = `<h1>${String(bal)}<h1>`

    description.value = "";
    amount.value = "";
});