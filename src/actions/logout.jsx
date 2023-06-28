import {redirect} from "react-router-dom"
import { deleteItem } from "../helper"

export async function logoutAction(){

    deleteItem({key: "userName"})

    return redirect("/")
}