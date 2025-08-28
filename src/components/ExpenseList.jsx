import { h } from 'preact';

const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(date);
};

export function ExpenseList({ expenses, onEditExpense, editingExpense, onDeleteExpense }) {
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const month = getMonthYear(expense.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(expense);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(expensesByMonth).map(([month, monthExpenses]) => {
        const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        return (
          <ul class="list-group mb-3" key={month}>
            <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center p-3">
              <h5 class="mb-0">{month}</h5>
              <span class="fw-bold">€ {monthTotal.toFixed(2)}</span>
            </li>
            {monthExpenses.map((expense, index) => (
              <li key={index} class={`list-group-item d-flex justify-content-between align-items-center ${expense === editingExpense ? 'list-group-item-info' : ''}`}>
                <div>
                  {expense.name}
                  <small class="d-block text-muted">{expense.date}</small>
                </div>
                <div>
                  <span class="badge bg-primary rounded-pill me-2">€ {expense.amount.toFixed(2)}</span>
                  <button class="btn btn-link btn-sm" onClick={() => onEditExpense(expense)}>Edit</button>
                  <button class="btn btn-link btn-sm text-danger" onClick={() => onDeleteExpense(expense)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}