/* Your Code Here */

function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArraysArray) {
    return employeeArraysArray.map(function(employeeArray) {
        return createEmployeeRecord(employeeArray)
    })
}

function createTimeInEvent(timeIn) {
    const [date, hour] = timeIn.split(" ");
    const record = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(record);
    return this
}

function createTimeOutEvent(timeOut) {
    const [date, hour] = timeOut.split(" ");
    const record = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(record);
    return this
}

function hoursWorkedOnDate(date) {
    const start = this.timeInEvents.find(e => e.date === date);
    const end = this.timeOutEvents.find(e => e.date === date);
    return (end.hour - start.hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(employeesArray, name) {
    return employeesArray.find(function(employee) {
        return employee.firstName === name
    })
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce(function(memo, employee) {
        return memo + allWagesFor.call(employee)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}