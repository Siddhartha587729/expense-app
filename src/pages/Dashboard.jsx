import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helper"

export function dashboardLoader(){
    const userName =fetchData("userName");
    return {
        userName
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData() 
    return (
        <div>Dashboard {userName}</div>
    )
}

export default Dashboard
