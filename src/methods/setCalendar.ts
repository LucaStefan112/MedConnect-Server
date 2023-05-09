import Calendar from "../models/calendar";
import calendar from "../models/calendar";
import { doctorChecker } from "./setSchedule";

export default async function settingCalendar(idDoc, dateStart: Date, dateFinish: Date) {
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await calendar.findOne({ doctor: idDoc });
        if (checker == null) {
            const doctor = idDoc;
            const dates = await parserDate(dateStart, dateFinish);
            const calendar = new Calendar({
                doctor,
                dates
            });
           // await calendar.save();
            console.log("The instance is created");
        }
        else {
            //
            const dates = await parserDate(dateStart, dateFinish);
            /*for (var i; i < dates.length; i++) {
                checker.dates.push(dates[i]);
            }
            await calendar.findByIdAndUpdate(checker.id, { dates: checker.dates });*/
            console.log("The instance was updated");
        }
    }
}

async function parserDate(dateStart: Date, dateFinish: Date) {
    let finalDates = [];
    let hourStart = dateStart.getHours();
    let minStart = dateStart.getMinutes();
    const hourFinal = dateFinish.getHours();
    const minFinal = dateFinish.getMinutes();
    while (hourStart <= hourFinal) {
        if(hourStart==hourFinal && minStart>minFinal){
            break;
        }
        var helper=new Date(dateStart);
        helper.setHours(hourStart);
        helper.setMinutes(minStart);
        finalDates.push(helper)
        minStart = (minStart + 30) % 60;
        if (minStart == 0) {
            hourStart++;
        }
    }
    console.log(finalDates);
    return finalDates;
}


export async function gettingCalendar(idDoc) {
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await calendar.find({ doctor: idDoc });
        if(checker==null){
            console.log("No calendar");
            return null;
        }
        else{
            var returnArray = [];
            var counter=0;
            for(const time of checker){
                var i;
                for(i=0;i<time.dates.length;i++){
                    returnArray[counter]=time.dates[i];
                    counter++;
                }
            }
            console.log("There is the calendar")
            //console.log(returnArray)
            return returnArray;
        }
    }
}