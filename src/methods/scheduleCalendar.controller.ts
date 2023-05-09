import { doctorChecker } from "./setSchedule";
import calendar from "../models/calendar";
import schedule from "../models/schedule";

export default async function modifyingBoth(idDoc, date: Date) {
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await calendar.findOne({ doctor: idDoc });
        if (checker == null) {
            delete checker.dates[0];
            let i=0;
        }
    }
}
