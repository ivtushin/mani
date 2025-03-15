let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
    const income = transactions
        .filter(tr => tr.type === 'income')
        .reduce((sum, tr) => sum + tr.amount, 0);
    
    const expense = transactions
        .filter(tr => tr.type === 'expense')
        .reduce((sum, tr) => sum + tr.amount, 0);
    
    document.getElementById('income').textContent = `${income} ₽`;
    document.getElementById('expense').textContent = `${expense} ₽`;
    document.getElementById('balance').textContent = `${income - expense} ₽`;
}

function renderTransactions() {
    const container = document.getElementById('transactions');
    container.innerHTML = '';
    
    transactions.forEach(transaction => {
        const div = document.createElement('div');
        div.className = `transaction ${transaction.type}`;
        div.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}${transaction.amount} ₽</span>
        `;
        container.appendChild(div);
    });
}

document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = +document.getElementById('amount').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    
    if (description.trim() && amount > 0) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
            type
        };
        
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        updateBalance();
        renderTransactions();
        
        e.target.reset();
    }
});

// Инициализация
updateBalance();
renderTransactions();
