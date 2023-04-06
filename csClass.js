// import time conversion function to get 24 hour time format for all classes
let { convertTime } = require('./timeConversion'); 

/**
 * @class A CS class At Cal Poly Pomona
 * @param {String} name - the name of the class
 * @param {String} catalogNumber - the catalog number for the class, ie. '2600' in CS 2600 (String because course numbers can include
 * L for lab classes)
 * @param {Number} sectionNumber - the section number for the class, ie. CS 2600-01 for Section 1 of CS 2600 
 * @param {String} startDate - a datestring in the form of YYYY-MM-DD, ie. Jan. 1 2021 is 2021-01-01
 * @param {String} startTime - string in the format of 'HH:MM' PM in 12 hour time, the constructor will then convert to 24 hour
 * time, ie. 4PM being 16:00
 * @param {String} endDate - a datestring in the form of YYYY-MM-DD, ie. Jan. 1 2021 is 2021-01-01
 * @param {String} endTime - string in the format of HH:MM in 24 hour time, ie. 4PM being 16:00
 * @param {String} professor - the professor's name
 * @param {String} classDays - the days of the class in a two character sequence separated by commas as follows:
 *      - "MO" for Monday
 *      - "TU" for Tuesday
 *      - "WE" for Wednesday
 *      - "TH" indicates Thursday
 *      - "FR" indicates Friday
 *      - "SA" indicates Saturday
 * @param {String} instructionMode - instruction mode of the class ie. fully synchronous online, fully face-to-face instruction on campus, etc.
 */
class csClass {
    constructor(name, catalogNumber, sectionNumber, startDate, startTime, endDate, endTime, professor, classDays, instructionMode) {
        /**
         * @private
         */
        this.name = name;
        this.catalogNumber = catalogNumber;
        this.sectionNumber = sectionNumber;

        // the first day of class
        this.start = new Date();
        let startDateSplit = startDate.split('-');
        let startYear = startDateSplit[0];
        let startMonth = startDateSplit[1] - 1;
        let startDay = startDateSplit[2];
        this.start.setFullYear(startYear, startMonth, startDay);

        // the time that the class starts
        this.startTime12Hour = startTime;
        // convert to 24 hour time format for javascript date object
        let convertedStartTime = convertTime(startTime);
        let startTimeSplit = convertedStartTime.split(':');
        this.start.setHours(startTimeSplit[0]);
        this.start.setMinutes(startTimeSplit[1]);

        // the last day of class
        this.end = new Date(`${endDate}T00:00:00`);
        let endDateSplit = endDate.split('-');
        let endYear = endDateSplit[0];
        let endMonth = endDateSplit[1] - 1;
        let endDay = endDateSplit[2];
        this.end.setFullYear(endYear, endMonth, endDay);
        // the time that the class ends
        this.endTime12Hour = endTime;
        // convert to 24 hour time format for javascript date object
        this.endTime = new Date(`${startDate}T00:00:00`);
        let convertedEndTime = convertTime(endTime);
        let endTimeSplit = convertedEndTime.split(':');
        this.endTime.setHours(endTimeSplit[0]);
        this.endTime.setMinutes(endTimeSplit[1]);
        
        this.professor = professor;
        this.classDays = classDays;
        this.instructionMode = instructionMode;
    }

    // getter methods
    get getName() {
        return this.name;
    }

    get getCatalogNumber() {
        return this.catalogNumber;
    }

    get getSectionNumber() {
        return this.sectionNumber;
    }

    get getStartDate() {
        return this.start;
    }

    get getStartTime() {
        return this.start.getHours() + ':' + this.start.getMinutes();
    }

    get getEndDate() {
        return this.end;
    }

    get getStartDateEndTime() {
        return this.endTime;
    }

    get getEndTime() {
        return this.endTime.getHours() + ':' + this.endTime.getMinutes();
    }

    get getProfessor() {
        return this.professor;
    }

    get getClassDays() {
        return this.classDays;
    }

    // setter methods
    set setName(newName) {
        this.name = newName;
    }

    set setCatalogNumber(courseNum) {
        this.catalogNumber = courseNum;
    }

    set setSectionNumber(section) {
        this.sectionNumber = section;
    }

    set setStartDate(date) {
        this.start.startDate.setDate(date);
    }

    set setStartTime(newStartTime) {
        let newStartTimeSplit = newStartTime.split(':');
        this.start.setHours(newStartTimeSplit[0]);
        this.start.setMinutes(newStartTimeSplit[1]);
    }

    set setEndDate(newEndDate) {
        this.end.endDate.setDate(newEndDate);
    }

    set setEndTime(newEndTime) {
        let newEndTimeSplit = newEndTime.split(':');
        this.endTime.setHours(newEndTimeSplit[0]);
        this.endTime.setMinutes(newEndTimeSplit[1]);
    }

    set setProfessor(newProf) {
        this.professor = newProf;
    }

    set setClassDays(newDays) {
        this.classDays = newDays;
    }
}

// export method from node.js
module.exports = {
    csClass: csClass
}