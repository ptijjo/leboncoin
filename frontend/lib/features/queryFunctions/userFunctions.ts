import { UserData } from "@/lib/InterfaceData";
import { Url } from "@/lib/Url"
import axios from "axios"


export const userDataConnected = async (token:string):Promise<UserData> => {
    try {

        if (!token) throw Error("Pas de token !");

        const response = await axios.get(Url.whoConnected, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        });
        
        return response.data

    } catch (error) {
        throw Error(`Une erreur s'est produite : ${error}`)
    }
}