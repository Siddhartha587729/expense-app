import { useLoaderData} from "react-router-dom";
import { deleteItem, fetchData } from "../helper";
import Table from "../components/Table";
import { toast } from "react-toastify";


export function expensesLoader(){
    const expenses = fetchData("expenses");
    return { expenses };
}

export async function expenseAction({ request }){
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "deleteExpense"){
        try{
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            })
            return toast.success(`Expense deleted!`)
        }catch(e){
            throw new Error("There was an error deleting your expense");
        }
    }
}

function ExpensesPage() {
    const { expenses } = useLoaderData()
    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses}></Table>
                    </div>
                ) : (
                    <p>No Expenses to show</p>
                )
            }
        </div>
    )
}

export default ExpensesPage