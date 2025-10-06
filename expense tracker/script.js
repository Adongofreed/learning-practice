// Step 1: Select important elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Step 2: Load existing expenses from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Step 3: Display any saved expenses on page load
displayExpenses();
calculateTotal();

// Step 4: Add Expense Function
function addExpense() {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  // Validate input
  if (name === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  // Create expense object
  const expense = {
    id: Date.now(),
    name: name,
    amount: amount
  };

  // Add to array
  expenses.push(expense);

  // Save to localStorage
  saveExpenses();

  // Update display
  displayExpenses();

  // Clear input fields
  expenseNameInput.value = '';
  expenseAmountInput.value = '';

  // Update total
  calculateTotal();
}

// Step 5: Display Expenses Function
function displayExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach((expense) => {
    const li = document.createElement('li');
    li.textContent = `${expense.name} - $${expense.amount.toFixed(2)}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
      deleteExpense(expense.id);
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  });
}

// Step 6: Calculate Total
function calculateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Step 7: Delete Expense
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  displayExpenses();
  calculateTotal();
}

// Step 8: Save to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Step 9: Event Listener
addBtn.addEventListener('click', addExpense);
