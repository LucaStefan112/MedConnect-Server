import schedule from "../models/schedule";
import Schedule from "../models/schedule";
import user from "../models/user";

//-------------------------------------
export async function doctorChecker(idPerson) { //checking if the user is a doctor
    const checker = await user.findById(idPerson);
    if (checker.role == "patient") {
        console.log("No doctor");
        return false;
    }
    return true;
}

//----------------------------------------------------

export default async function settingSchedule(idDoc, date: Date, patient) { //should be called when the appointment function is used -> inside of it
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await schedule.findOne({ doctor: idDoc });
        if (checker == null) {
            const doctor = idDoc;
            const dates = date;
            const patients = patient;
            const schedule = new Schedule({
                doctor,
                dates,
                patients
            });
            await schedule.save();
            console.log("The instance is created");
        }
        else {
            //
            checker.dates.push(date);
            checker.patients.push(patient);
            console.log(checker.patients)
            await schedule.findByIdAndUpdate(checker.id, { dates: checker.dates, patients: checker.patients });
            console.log("The instance was updated");
        }
    }
}

export async function gettingHour(idDoc, date: Date) { //appointments specific time (exactly the same)
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await schedule.findOne({ doctor: idDoc, dates: { $in: [date] } });
        if (checker == null) {
            console.log("No appointments today for this hour");
            return false;
        }
        else {
            console.log("An appointments today for this hour");
            return true;
        }
    }
}

export async function gettingDay(idDoc, date: Date) { //appointments  specific day
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const day = date.getDate();
        const month = date.getMonth();
        const checker = await gettingSchedule(idDoc);
        if (checker == null) {
            console.log("No appointments");
        }
        else {
            var i;
            var returnArray = [];
            var counter = 0;
            for (i = 0; i < checker.length; i++) {
                if (checker[i].getMonth() == month && checker[i].getDate() == day) {
                    returnArray[counter] = checker[i];
                    counter++;
                }
            }
            if (counter == 0) {
                console.log(" no exist ");
            }
            else {
                console.log("There are appointments")
                return returnArray;
            }
        }
    }
}

export async function gettingSchedule(idDoc) { //full schedule of a doctor
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const checker = await schedule.find({ doctor: idDoc });
        if (checker == null) {
            console.log("No appointments today");
            return null;
        }
        else {
            var returnArray = [];
            var counter = 0;
            for (const time of checker) {
                var i;
                for (i = 0; i < time.dates.length; i++) {
                    returnArray[counter] = time.dates[i];
                    returnArray[counter + 1] = time.patients[i];
                    counter = counter + 2;
                }
            }
            console.log("There are appointments")
            //console.log(returnArray)
            return returnArray;
        }
    }
}

export async function gettingScheduleDate(idDoc, date: Date) { //full schedule of a doctor
    const doc = await doctorChecker(idDoc);
    if (doc == true) {
        const day = date.getDate();
        const month = date.getMonth();
        const checker = await schedule.find({ doctor: idDoc });
        if (checker == null) {
            console.log("No appointments today");
            return null;
        }
        else {
            var returnArray = [];
            var counter = 0;
            for (const time of checker) {
                var i;
                for (i = 0; i < time.dates.length; i++) {
                    if (time.dates[i].getMonth() == month && time.dates[i].getDate() == day) {
                        returnArray[counter] = time.dates[i];
                        returnArray[counter + 1] = time.patients[i];
                        counter = counter + 2;
                    }
                }
            }
            console.log("There are appointments")
            //console.log(returnArray)
            return returnArray;
        }
    }
}


