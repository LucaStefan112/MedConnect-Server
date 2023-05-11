import user from "../models/user";
import { gettingCalendar } from "./setCalendar";
import { doctorChecker, gettingSchedule } from "./setSchedule";


export default async function jsonHelper(idDoc) {
    const doc = await doctorChecker(idDoc);
    const fs = require('fs');
    if (doc == true) {
        //creating the schedule first -> busy
        const scheduleResult = await gettingSchedule(idDoc);
        let schedules = [];
        for (var i = 0; i < scheduleResult.length; i = i + 2) {
            const patient = await user.findById(scheduleResult[i+1]);
            let scheduleInstance = {
                "date": scheduleResult[i],
                "patient": patient
            };
            schedules.push(scheduleInstance);
        }
        //testing
        //console.log(schedules);

        //creating the calendar of the doc ( available days) -> free
        const calendarResult = await gettingCalendar(idDoc);
        let calendars = [];
        for (var j = 0; j < calendarResult.length; j++) {
            let calendarInstance = {
                "date": calendarResult[i],
                "patient": null
            };
            calendars.push(calendarInstance);
        }

        //testing
        //console.log(calendars);

        let finalResult = {
            "busy": schedules,
            "free": calendars
        };

        //testing
        //console.log(finalResult);

        //converting to JSON
        const jsonData = JSON.stringify(finalResult,null,2);

        //writing the data
        fs.writeFile("data.json", jsonData, (error) => {
            // throwing the error
            // in case of a writing problem
            if (error) {
                // logging the error
                console.error(error);

                throw error;
            }

            console.log("data.json written correctly");
        });
    }
}