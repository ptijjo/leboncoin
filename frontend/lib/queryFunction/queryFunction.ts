import axios from "axios"
import { Url } from "../Url"


export const whoConnect = async (token: string): Promise<{
    userId: string;
    userPhoto: string;
    userEmail: string;
    userPseudo: string;
    userRole:string}> => {
    try {
        
        const userData = await axios.get(Url.whoConnected, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return userData.data;
    } catch (error) {
        console.log(`Oups une errreur s'est produite 🤯 : ${error}`);     
        throw error;
    }
    
}