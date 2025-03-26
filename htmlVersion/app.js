const balance = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to update balance values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    balance.innerText = `${total}€`;
}

// Function to add transactions to the DOM with correct styles
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add CSS class based on transaction type
    item.classList.add(transaction.amount < 0 ? 'expense' : 'income');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}€</span>
        <button class="delete-btn">Poista</button>
    `;

    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        removeTransaction(transaction.id);
        item.remove();
    });

    transactionList.appendChild(item);
}

// Function to remove a transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateValues();
}

// Function to handle form submission
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a description and amount');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
}

// Function to generate a random transaction ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Function to initialize app and load transactions
function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event listener for form submission
form.addEventListener('submit', addTransaction);
