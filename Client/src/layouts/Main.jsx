import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helper"

import wave from "../assets/wave.svg"
import Nav from "../components/Nav"

export function mainLoader(){
    const userName =fetchData("userName");
    return {
        userName
    }
}

const Main = () => {
    const { userName } = useLoaderData() 
    return (
        <div className="layout">
            <Nav userName = {userName} />
            <Outlet/>
            <img src={wave} alt="footer here" />
        </div>
        
        
    )
}

export default Main
