import moxios from "moxios";
import fs from "fs";
import request from "supertest";
import mcache from "memory-cache";
import app from "../src/app";
import { requestTitles } from "../src/services/googleNewsRSS";

describe("getTitles", function () {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it("returns array of strings parsed from xml", async function (done) {
        moxios.wait(function () {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: fs.readFileSync("./test/requestSnapshot.xml")
            });
        });
        var data = await requestTitles();
        expect(data.length).toEqual(3);
        expect(data[0]).toEqual("White House to release whistleblower complaint against Trump to Congress by Thursday, source says - CNBC");
        expect(data[1]).toEqual("Trump defends nationalism, American sovereignty in rousing UN speech - New York Post ");
        expect(data[2]).toEqual("A Man or a ‘Yellow Object?’ Hong Kong Police Dispute Assault Allegations - The New York Times");
        done();
    });

    it("returns empty array if request failed", async function (done) {
        moxios.wait(function () {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: { message: "invalid data" }
            });
        });
        var data = await requestTitles();
        expect(data.length).toEqual(0);
        done();
    });

    it("The GET response is correct", async function (done) {
        var data: any;
        moxios.wait(function () {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: fs.readFileSync("./test/requestSnapshot.xml")
            });
        });

        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        data = JSON.parse(response.text);
        expect(data.length).toEqual(3);
        expect(data[0]).toEqual("White House to release whistleblower complaint against Trump to Congress by Thursday, source says - CNBC");
        expect(data[1]).toEqual("Trump defends nationalism, American sovereignty in rousing UN speech - New York Post ");
        expect(data[2]).toEqual("A Man or a ‘Yellow Object?’ Hong Kong Police Dispute Assault Allegations - The New York Times");
        done();
    });

    it("The GET response is cached", async function (done) {
        let count = 0;

        mcache.clear();
        moxios.wait(function () {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: fs.readFileSync("./test/requestSnapshot.xml")
            });
            count++;
        });
        await request(app).get("/");
        await request(app).get("/");
        await request(app).get("/");
        expect(count).toBe(1);
        done();
    });
});