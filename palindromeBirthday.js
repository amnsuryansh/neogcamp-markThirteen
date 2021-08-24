var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function reverseString(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reverseString(str);
    return str === reverse;
}

function convertDateToString(date) {
    var datestr = {
        day: '',
        month: '',
        year:''
    };
    if (date.day < 10) {
        datestr.day = '0' + date.day;
    } else {
        datestr.day = date.day.toString();
    }
    if (date.month < 10) {
        datestr.month = '0' + date.month;
    } else {
        datestr.month = date.month.toString();
    }

    datestr.year = date.year.toString();

    return datestr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getAllDateFormats(date);
    var palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
        if (day > 29) {
            day = 1;
            month = 3;
        }
        } else {
        if (day > 28) {
            day = 1;
            month = 3;
        }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isAPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isAPalindrome) { break; }
        nextDate = getNextDate(nextDate);
        
    }

    return [ctr, nextDate];
        
}

function clickHandler(e) {
    var bdayString = bdayInput.value;

    if (bdayString !== "") {
        var date = bdayString.split("-");
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };
        var isPalindrome  = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            result.innerText = "Yay! Your birthday is palindrome!";
        }
        else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            result.innerText = "The nearest palindrome date is" + nextDate.day + "-" +
                nextDate.month + "-"+nextDate.year +"you missed by "+ ctr+" days."
        }
    }
}

showBtn.addEventListener("click",clickHandler);

