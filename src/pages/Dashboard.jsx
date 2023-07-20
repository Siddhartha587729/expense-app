import { Link, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, fetchData, waait } from "../helper"
import Intro from "../components/Intro";
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseFrom from "../components/AddExpenseFrom";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


export function dashboardLoader(){
    const userName =fetchData("userName");
    const budgets =fetchData("budgets");
    const expenses =fetchData("expenses")
    return { userName, budgets, expenses }
}

export async function dashboardAction({request}){
    await waait();

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if(_action=== "newUser"){
        try{
            localStorage.setItem("userName",JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`) 
        }catch(e){
            throw new Error("there was a problem creating your account.")
        }
    }
    if(_action === "createBudget"){
        try{
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created!")
        }catch(e){
            throw new Error("There was an error creating your budget");
        }
    }
    if(_action === "createExpense"){
        try{
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget

            })
            return toast.success(`Expense ${values.newExpense} created!`)
        }catch(e){
            throw new Error("There was an error creating your expense");
        }
    }
    //console.log(formData)
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData() 
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0 ? (
                                <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm/>
                                    <AddExpenseFrom budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget)=>{
                                            return <BudgetItem key={budget.id} budget={budget}/>
                                        })
                                    }
                                </div>
                                {
                                    expenses && expenses.length>0 &&(
                                        <div className="rid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses = {expenses.sort((a, b) => b.createAt - a.createAt).slice(0,8)}/>
                                            {expenses.length > 8 && (
                                                <Link to="expenses" className="btn btn--dark">View all expenses</Link>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                            ) : (
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm/>
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro/>}
        </>
    )
}

export default Dashboard
