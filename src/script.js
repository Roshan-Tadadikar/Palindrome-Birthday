var inpEl = document.querySelector('#date-inp');
var btnEl = document.querySelector('#chk-btn');

const dateFormats = [
  'ddmmyyyy',
  'mmddyyyy',
  'yyyymmdd',
  'yyyyddmm',
  'ddmmyy',
  'mmddyy',
  'yymmdd',
  'yyddmm',
];

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const reverseStr = (str) => {
  return str.replaceAll('-', '').split('').reverse().join('');
};

const isPalindrome = (str) => {
  const reversedStr = reverseStr(str);
  return reversedStr === str;
};

const convertDateToStr = (date) => {
  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
};

const getAllDateFormats = (date) => {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var yyyyddmm = dateStr.year + dateStr.day + dateStr.month;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

  return [
    ddmmyyyy,
    mmddyyyy,
    yyyymmdd,
    yyyyddmm,
    ddmmyy,
    mmddyy,
    yymmdd,
    yyddmm,
  ];
};


const checkPalindromeForAllFormats = (date) => {
    const listOfPalindromes = getAllDateFormats(date);
  
    let flag = false;
    let palindromeDate;
    let dateFormat;
    for (let i = 0; i < listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
        dateFormat = dateFormats[i];
        palindromeDate = listOfPalindromes[i];
        break;
      }
    }
  
    return [flag, palindromeDate, dateFormat];
    // return flag;
  };


  const isLeapYear = (year) => {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  };

  
  const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
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
    return { day, month, year };
  };


  const getPrevDate = (date) => {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
  
    // case of february
  
    if (month === 3) {
      if (isLeapYear(year)) {
        if (day < 1) {
          day = 29;
          month--;
        }
      } else {
        if (day < 1) {
          day = 28;
          month--;
        }
      }
    } else {
      //Other months
      if (day < 1) {
        // 1 January
        if (month === 1) {
          month = 12;
          year--;
        } else {
          // 1 of any other month
          month--;
        }
        day = daysInMonth[month - 1]; // day set to last day of the month
      }
    }
  
    return { day, month, year };
  };

  const getNextPalindromeDate = (date) => {
    var ctr = 0;
  
    var nextDate = getNextDate(date);
  
    while (1) {
      ctr++;
      var [flag, palindromeDate, dateFormat] =
        checkPalindromeForAllFormats(nextDate);
      // var flag = checkPalindromeForAllFormats(nextDate);
      if (flag) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    nextDate = convertDateToStr(nextDate);
  
    let dateStr = nextDate.day + '/' + nextDate.month + '/' + nextDate.year;
  
    return [ctr, (prevDate = dateStr), dateFormat];
  };
  
  const getPrevPalindromeDate = (date) => {
    var ctr = 0;
  
    var prevDate = getPrevDate(date);
    while (1) {
      ctr++;
      var [flag, palindromeDate, dateFormat] =
        checkPalindromeForAllFormats(prevDate);
      // var flag = checkPalindromeForAllFormats(nextDate);
      if (flag) {
        break;
      }
      prevDate = getPrevDate(prevDate);
    }
  
    prevDate = convertDateToStr(prevDate); //To concat 0 in case of <10
  
    let dateStr = prevDate.day + '/' + prevDate.month + '/' + prevDate.year;
  
    return [ctr, (prevDate = dateStr), dateFormat];
  };

  const inpRef = document.querySelector('#date-input');
const chkRef = document.querySelector('#chk-btn');
const outputRef = document.querySelector('#res-output');
console.log("helllllo");


function clickHandler(e){
    var bdayStr = inpRef.value;

    if(bdayStr!=='')
     var listofDate = bdayStr.split("-");

     var date={
        day: Number(listofDate[2]),
        month: Number(listofDate[1]),
        year: Number(listofDate[0]),
     };

     let [flag, palindromeDate, dateFormat] = checkPalindromeForAllFormats(date);

  if (flag) {
    outputRef.innerText = `Yay!! Your birthday is palindrome :D`;
  } else {
    let [nextCtr = ctr, nextDate, nextDateFormat = dateFormat] =
      getNextPalindromeDate(date);
    let [prevCtr = ctr, prevDate, prevDateFormat = dateFormat] =
      getPrevPalindromeDate(date);

    console.log(nextDate);
    console.log(prevDate);

    nextCtr > prevCtr
      ? (outputRef.innerText = `Woops!! Your birthdate is not a palindrome,  closest palindrome date is ${prevDate} in ${prevDateFormat} format, which is ${prevCtr} days ago`)
      : (outputRef.innerText = `Woops!! Your birthdate is not a palindrome, closest palindrome date is ${nextDate} in ${nextDateFormat} format, which is ${nextCtr} days later`);
  }
};



chkRef.addEventListener('click', clickHandler);