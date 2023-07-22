import React from 'react'
import ExpenseItems from './ExpenseItems'

function Table({expenses, showBudget = true}) {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                        ["Name", "Amount", "Date",showBudget ?
                        "Budget" : "" ,""].map((i,index)=>(
                            <th key={index}>{i}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense)=>(
                        <tr key = {expense.id}>
                            {/* {expense.name} */}
                            <ExpenseItems expense={expense} showBudget={showBudget}/>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table