import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helper"

export function mainLoader(){
    const userName =fetchData("userName");
    return {
        userName
    }
}

const Main = () => {
    const { userName } = useLoaderData() 
    return (
        <div>
            <div>Main</div>
            <Outlet/>
            <div>Main</div>
        </div>
        
        
    )
}

export default Main
