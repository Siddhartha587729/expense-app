const generateRandomColor = ()=>{
    const existingBudgetsLenght =  fetchData("budgets") ?. length ?? 0;
    return `${existingBudgetsLenght * 34} 65% 50%`
}

export const waait = ()=> new Promise(res=> setTimeout(res,Math.random()*800))


export const fetchData = (key)=>{
    return JSON.parse(localStorage.getItem(key))
}

export const createBudget = ({ name , amount })=>{
    const newItem = {
        id : crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,//this + is convert string to number
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", 
    JSON.stringify([...existingBudgets, newItem]))
}


export const createExpense = ({ name , amount, budgetId})=>{
    const newItem = {
        id : crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,     //this + is convert string to number
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", 
    JSON.stringify([...existingExpenses, newItem]))
}

/* export const deleteItem = ({key})=>{
    return localStorage.removeItem(key)
} */

//formatting

export const formatDateToLocaleString = (epoch) => 
new Date(epoch).toLocaleDateString();

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "INR"
    })
}

export const calculateSpentByBudget = (budgetId) =>{
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense)=>{
        if(expense.budgetId !== budgetId) return acc

        return acc+= expense.amount
    },0)
    return budgetSpent;
}

//percentage

export const formatPercentage=(amt)=>{
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

//Get all items from local storage

export const getAllMatchingItems=({category, key, value})=>{
    const data = fetchData(category) ?? [];
    return data.filter((item)=> item[key]===value);
}

export const deleteItem = ({key,id})=>{
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item)=> item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}
