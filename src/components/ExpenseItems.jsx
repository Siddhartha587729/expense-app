import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helper'

function ExpenseItems({expense}) {
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createAt) }</td>
            <td>{formatDateToLocaleString(expense.createAt) }</td>
        </>
    )
}

export default ExpenseItems