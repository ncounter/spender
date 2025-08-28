
import { h } from 'preact';

export function RecurrentExpensesList({ recurrentExpenses, onEditRecurrentExpense, onDeleteRecurrentExpense, editingRecurrentExpense }) {
  return (
    <ul class="list-group">
      {recurrentExpenses.map((expense, index) => (
        <li key={index} class={`list-group-item d-flex justify-content-between align-items-center ${expense === editingRecurrentExpense ? 'list-group-item-info' : ''}`}>
          <div>
            {expense.name}
            <small class="d-block text-muted">{expense.frequency}</small>
          </div>
          <div>
            <span class="badge bg-primary rounded-pill me-2">€ {expense.amount.toFixed(2)}</span>
            <button class="btn btn-link btn-sm" onClick={() => onEditRecurrentExpense(expense)}>Edit</button>
            <button class="btn btn-link btn-sm text-danger" onClick={() => onDeleteRecurrentExpense(index)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
