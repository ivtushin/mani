let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let currentFilter = 'all';
let financeChart = null;

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('financeChart').getContext('2d');
    
    const data = {
        labels: ['Доходы', 'Расходы', 'Баланс'],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: [
                '#10b981',
                '#ef4444',
                '#6366f1'
            ],
            borderWidth: 0
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: var(--text)
                    }
                }
            }
        }
    };

    financeChart = new Chart(ctx, config);
}

function updateChart() {
    const income = transactions
        .filter(tr => tr.type === 'income')
        .reduce((sum, tr) => sum + tr.amount, 0);
    
    const expense = transactions
        .filter(tr => tr.type === 'expense')
        .reduce((sum, tr) => sum + tr.amount, 0);

    financeChart.data.datasets[0].data = [income, expense, income - expense];
    financeChart.update();
}

function updateBalance() {
    const income = transactions
        .filter(tr => tr.type === 'income')
        .reduce((sum, tr) => sum + tr.amount, 0);
    
    const expense = transactions
        .filter(tr => tr.type === 'expense')
        .reduce((sum, tr) => sum + tr.amount, 0);

    document.getElementById('income').textContent = `${income.toLocaleString()} ₽`;
    document.getElementById('expense').textContent = `${expense.toLocaleString()} ₽`;
    document.getElementById('balance').textContent = `${(income - expense).toLocaleString()} ₽`;
}

function renderTransactions() {
    const container = document.getElementById('transactions');
    container.innerHTML = '';

    const filtered = transactions
        .filter(tr => currentFilter === 'all' || tr.type === currentFilter)
        .sort((a, b) => b.date - a.date);

    filtered.forEach(transaction => {
        const element = document.createElement('div');
        element.className = `transaction-item ${transaction.type}`;
        element.innerHTML = `
            <div class="transaction-meta">
                <span>${transaction.description}</span>
                <span class="transaction-category">${transaction.category}</span>
                <small>${new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <div>
                <span style="color: ${transaction.type === 'income' ? '#10b981' : '#ef4444'}">
                    ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()} ₽
                </span>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(element);
    });
}

function deleteTransaction(id) {
    if(confirm('Удалить эту операцию?')) {
        transactions = transactions.filter(tr => tr.id !== id);
        saveData();
        updateUI();
    }
}

function saveData() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateUI() {
    updateBalance();
    updateChart();
    renderTransactions();
}

// Обработчик формы
document.getElementById('transactionForm').addEventListener('submit', e => {
    e.preventDefault();
    
    const transaction = {
        id: Date.now(),
        description: document.getElementById('description').value.trim(),
        amount: parseFloat(document.getElementById('amount').value),
        type: document.querySelector('.type-btn.active').dataset.type,
        category: document.getElementById('category').value,
        date: new Date().getTime()
    };
    
    if(transaction.description && transaction.amount > 
