import { AioDateHelper, IDateDistance } from './date-helper.class';
import './style.css';

/* Date Distance 
a function that run AioDateHelper.distance(), calculate distance between two date
(dateEl_1 and dateEl_2) and add eventlistener on that date input, then print the calculated value on distanceOutput
*/
const dateEl_1 = document.getElementById('date-distance-1') as HTMLInputElement;
const dateEl_2 = document.getElementById('date-distance-2') as HTMLInputElement;
const distanceOutput = document.getElementById('output-distance') as HTMLInputElement;

function calculateDistance() {
  const dateHelper = new AioDateHelper();

  function handleDateChange() {
    console.clear();
    const date1 = new Date(dateEl_1.value);
    console.log('Date 1 :', date1);
    const date2 = new Date(dateEl_2.value);
    console.log('Date 2 :', date2);

    if (date1 && date2) {
      const distance = dateHelper.distance(date1, date2);
      console.log('Distance :', distance);
      distanceOutput.innerHTML = JSON.stringify(distance);
    }
  }

  dateEl_1.addEventListener('change', handleDateChange);
  dateEl_2.addEventListener('change', handleDateChange);
}
// init date distance calculation
calculateDistance();


/* Date Next / Last 
a function that run AioDateHelper.next() and AioDateHelper.last()
add eventlistener on dateNextLast input, and changes parameter on year, month, 
week, day, hour, minute, second then run AioDateHelper.next() and AioDateHelper.last() 
and print the value on nextLastOutput 
*/
const dateNextLast = document.getElementById('date-next-last') as HTMLInputElement;
const nextLastOption = document.getElementById('select-next-last') as HTMLSelectElement;

const year = document.getElementById('year') as HTMLInputElement;
const month = document.getElementById('month') as HTMLInputElement;
const week = document.getElementById('week') as HTMLInputElement;
const day = document.getElementById('day') as HTMLInputElement;
const hour = document.getElementById('hour') as HTMLInputElement;
const minute = document.getElementById('minute') as HTMLInputElement;
const second = document.getElementById('second') as HTMLInputElement;

const nextLastOutput = document.getElementById('output-next-last') as HTMLInputElement;

function calculateNextLast() {
  const dateHelper = new AioDateHelper();

  function calculate() {
    console.clear();
    console.log('Calculating next/last date...');

    const date = dateNextLast.valueAsDate;
    console.log('Selected Date    :', date);

    const option = nextLastOption.value;
    console.log('Method Selected  :', option);

    if (date) {
      const params = {
        year: Number(year.value) || 0,
        month: Number(month.value) || 0,
        week: Number(week.value) || 0,
        day: Number(day.value) || 0,
        hour: Number(hour.value) || 0,
        minute: Number(minute.value) || 0,
        second: Number(second.value) || 0
      };
      console.log('Params           :', params);

      const result = option === 'next' ? dateHelper.next(params) : dateHelper.last(params);
      console.log('Result           :', result);

      nextLastOutput.value = result.toLocaleString();
      // console.log('Output Date ISO String:', nextLastOutput.value);
    }
  }

  [year, month, week, day, hour, minute, second].forEach(input => {
    input.addEventListener('input', calculate);
  });

  nextLastOption.addEventListener('change', calculate);
  dateNextLast.addEventListener('change', calculate);
}

// init date next / last calculation
calculateNextLast();

/* Date Multiplier 
a function that run AioDateHelper.multiplier()
base on selected value from multiplierOption, create eventlistener on option value change
and print the value on multiplierOutput
*/
const multiplierOption = document.getElementById('select-multiplier') as HTMLSelectElement;
const multiplierOutput = document.getElementById('output-multiplier') as HTMLInputElement;

function showMultiplier() {
  function updateMultiplierOutput() {
    console.clear();
    const dateHelper = new AioDateHelper();
    const selectedUnit = multiplierOption.value as IDateDistance['unit'];
    console.log('Selected Unit    :', selectedUnit);
    const multiplierValue = dateHelper.multiplier(selectedUnit);
    console.log('Multiplier Value :', multiplierValue);
    multiplierOutput.value = String(multiplierValue);
  }

  multiplierOption.addEventListener('change', updateMultiplierOutput);
}

showMultiplier();

/* Date Part 
a function that run AioDateHelper.getDatePart
add eventlistener on datePart input, and print the value on datePartOutput
*/
const datePart = document.getElementById('date-part') as HTMLInputElement;
const datePartOutput = document.getElementById('output-date-part') as HTMLDivElement;

function getDatePart() {
  const dateHelper = new AioDateHelper();

  function handleDatePartChange() {
    const date = datePart.value;
    console.log(date);
    if (date) {
      console.clear();
      console.log('Date Part Source :', date);
      const dateParts = dateHelper.getDatePart(new Date(date));
      console.log('Date Part :', date);
      datePartOutput.innerHTML = JSON.stringify(dateParts);
    }
  }

  datePart.addEventListener('change', handleDatePartChange);
}

getDatePart();

/* Date Locale 
a function that run AioDateHelper.locale
add eventlistener on dateLocale input, and print the value on localeOutput, 
based on selected value from selectlocale
*/

const dateLocale = document.getElementById('date-locale') as HTMLInputElement;
const selectLocale = document.getElementById('select-locale') as HTMLSelectElement;
const localeOutput = document.getElementById('output-locale') as HTMLElement;

function setLocale() {

  function handleDateLocaleChange() {
    const date = dateLocale.valueAsDate as Date;
    const locale = selectLocale.value;

    if (date && locale) {
      console.clear();
      const dateHelper = new AioDateHelper(date, 'toLocaleString');
      dateHelper.locale = locale;
      const output = `
        Source      : ${date.toLocaleString()} | \n\n
        Locale      : ${locale} | \n\n 
        Next Sunday : ${dateHelper.nextSunday()} | \n\n
        Last Sunday : ${dateHelper.lastSunday()} \n\n`;
      console.log('Locale         :', locale);
      console.log('Locale Output  :', output);
      localeOutput.innerHTML = output;
    }
  }

  dateLocale.addEventListener('change', handleDateLocaleChange);
  selectLocale.addEventListener('change', handleDateLocaleChange);
}

setLocale();
