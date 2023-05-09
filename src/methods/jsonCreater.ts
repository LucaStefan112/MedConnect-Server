import { doctorChecker } from "./setSchedule";


export default async function jsonHelper(idDoc){
    const doc = await doctorChecker(idDoc);
    const fs=require('fs');
    if (doc == true) {
        let busy ={

        };
        let free ={

        };
    }
}