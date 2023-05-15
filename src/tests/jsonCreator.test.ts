import jsonHelper from "../methods/jsonCreator";
import {jsonOpener, freeDays, busyDays} from "../methods/jsonCreator";
import mongoose from 'mongoose';
import {dbConnect} from '../db/connection';

describe("jsonHelper", () => {
    beforeAll(async () => {
        //we connect to the database
        await dbConnect();
    });

    it("should create a json file", async () => {
        const idDoc = '6414c830e7477147fafa87e4'; //make sure the doctor has a calendar, doesn't work otherwise
        const logSpy = jest.spyOn(console, 'log');
        await jsonHelper(idDoc);
        expect(logSpy).toHaveBeenCalledWith('data.json written correctly');
    });

    afterAll(async () => {
        //we close the connection to the database
        await mongoose.connection.close();
    });
});



describe("jsonOpener", () => {

});


describe("freeDays", () => {

});

describe("busyDays", () => {

});