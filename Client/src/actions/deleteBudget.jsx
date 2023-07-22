import { toast } from "react-toastify"
import { deleteItem, getAllMatchingItems } from "../helper"
import { redirect } from "react-router-dom";

function deleteBudget({params}) {
    try{
        deleteItem({
            key: "budgets",
            id: params.id,
        })

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        });

        toast.success("Budget deleted successfully!")
    }catch(e){
        throw new Error("There was a problem deleting your budget.")
    }

    return redirect("/")
}

export default deleteBudget