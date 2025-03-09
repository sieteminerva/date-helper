import { AioDatetimeHelper, IDatetimeDistance, generateScheduleDate } from './date-helper.class';
import './style.css';



function testDateHelperClass() {
  console.warn('Initialized!');

  const config = {
    range: 'twice a week',
    time: { hour: 12, minutes: 0, second: 0 },
    qty: 7
  };

  for (let i = 0; i < (config.qty + 1); i++) {
    const at = generateScheduleDate(i, config);
    console.log(`Schedule ${i}: ${at}`);
  }

  const today = new Date('Jul 23 2024');
  console.log(`Today's date is            :`, today);

  const _DateHelper = new AioDatetimeHelper(today, 'toLocaleString');

  _DateHelper.locale = 'id-ID';
  console.info('Locale                    :', _DateHelper.locale);

  const lastSunday = _DateHelper.lastSunday();
  console.log(`Last Sunday's Date is      :\n`, lastSunday);

  const distanceToDead = _DateHelper.distance(today, new Date(lastSunday));
  console.log('Distance from Last Sunday  : \n', distanceToDead);

  const nextSunday = _DateHelper.nextSunday();
  console.log(`Next Sunday's Date is      :\n`, nextSunday);

  const distanceToNextSunday = _DateHelper.distance(today, new Date(nextSunday));
  console.log('Distance from Next Sunday  :\n', distanceToNextSunday);


  const dec45 = new Date('Dec 25 1945 12:00:00');
  console.warn('Current Date: ', _DateHelper.currentDate);

  const dec45DatePart = _DateHelper.getDatePart(dec45);
  console.log('Dec 45 Date Part           :', dec45DatePart);

  const dec45String = new Date(dec45DatePart.year ?? 0, dec45DatePart.month ?? 0, dec45DatePart.day, dec45DatePart.hour, dec45DatePart.minute, dec45DatePart.second);
  console.warn('Date Part to Date         :', dec45String);

  const nextFn = _DateHelper.next({ distance: 1, unit: 'year' });
  console.log(`Next Date in 1 Year        :`, nextFn);

  const lastFn = _DateHelper.last({ distance: 3, unit: 'month' });
  console.log(`Last Date in 3 Months      :`, lastFn);

  const multiplier = _DateHelper.multiplier('year');
  console.log('Multiplier                 :', multiplier);

  const NumDate = today.getTime() + (multiplier as number);
  console.log('Num Date as date           :', new Date(NumDate));
  console.log('Date Now         :', Date.now());
  console.log('Date.getTime()   :', new Date().getTime());

  const testParamDatePart = {
    hour: 25,
    second: 75,
    minute: 90,
    month: 13,
    /* day: 12,
    year: 2024 */
  };
  const NumDatePart = _DateHelper.getDatePart(testParamDatePart);
  console.log('Raw DatePart Normalized Date Part :', NumDatePart);


  const variableAdvance1 = [
    { distance: 8, unit: 'year' },
    { distance: 2, unit: 'month' },
    { distance: 20, unit: 'day' },
    { distance: 3, unit: 'hour' }
  ] as IDatetimeDistance[];
  const nextAdvance1 = _DateHelper.next(...variableAdvance1);
  console.warn('Next Advance 1: \n', nextAdvance1);
  const lastAdvance1 = _DateHelper.last(...variableAdvance1);
  console.warn('Last Advance 1: \n', lastAdvance1);

  const variableAdvance2 = {
    year: 8,
    month: 2,
    day: 20,
    hour: 3
  };
  const nextAdvance2 = _DateHelper.next(variableAdvance2);
  console.warn('Next Advance 2: \n', nextAdvance2);
  const lastAdvance2 = _DateHelper.last(variableAdvance2);
  console.warn('Last Advance 2: \n', lastAdvance2);

  const nextAdvance3 = _DateHelper.next({ distance: 4, unit: 'year' });
  console.warn('Next Advance 3: \n', nextAdvance3);
  const lastAdvance3 = _DateHelper.last({ distance: 4, unit: 'year' });
  console.warn('Last Advance 3: \n', lastAdvance3);

}

// testDateHelperClass();



/* Date Distance 
a function that run AioDatetimeHelper.distance(), calculate distance between two date
(dateEl_1 and dateEl_2) and add eventlistener on that date input, then print the calculated value on distanceOutput
*/
const dateEl_1 = document.getElementById('date-distance-1') as HTMLInputElement;
const dateEl_2 = document.getElementById('date-distance-2') as HTMLInputElement;
const distanceOutput = document.getElementById('output-distance') as HTMLInputElement;

function calculateDistance() {
  const dateHelper = new AioDatetimeHelper();

  function handleDateChange() {
    console.clear();
    const date1 = dateEl_1.valueAsDate;
    console.log('Date 1 :', date1);
    const date2 = dateEl_2.valueAsDate;
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
a function that run AioDatetimeHelper.next() and AioDatetimeHelper.last()
add eventlistener on dateNextLast input, and changes parameter on year, month, 
week, day, hour, minute, second then run AioDatetimeHelper.next() and AioDatetimeHelper.last() 
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
  const dateHelper = new AioDatetimeHelper();

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
a function that run AioDatetimeHelper.multiplier()
base on selected value from multiplierOption, create eventlistener on option value change
and print the value on multiplierOutput
*/
const multiplierOption = document.getElementById('select-multiplier') as HTMLSelectElement;
const multiplierOutput = document.getElementById('output-multiplier') as HTMLInputElement;

function showMultiplier() {
  function updateMultiplierOutput() {
    console.clear();
    const dateHelper = new AioDatetimeHelper();
    const selectedUnit = multiplierOption.value as IDatetimeDistance['unit'];
    console.log('Selected Unit    :', selectedUnit);
    const multiplierValue = dateHelper.multiplier(selectedUnit);
    console.log('Multiplier Value :', multiplierValue);
    multiplierOutput.value = String(multiplierValue);
  }

  multiplierOption.addEventListener('change', updateMultiplierOutput);
}

showMultiplier();

/* Date Part 
a function that run AioDatetimeHelper.getDatePart
add eventlistener on datePart input, and print the value on datePartOutput
*/
const datePart = document.getElementById('date-part') as HTMLInputElement;
const datePartOutput = document.getElementById('output-date-part') as HTMLDivElement;

function getDatePart() {
  const dateHelper = new AioDatetimeHelper();

  function handleDatePartChange() {
    const date = datePart.valueAsDate;
    if (date) {
      console.clear();
      console.log('Date Part Source :', date);
      const dateParts = dateHelper.getDatePart(date);
      console.log('Date Part :', date);
      datePartOutput.innerHTML = JSON.stringify(dateParts);
    }
  }

  datePart.addEventListener('change', handleDatePartChange);
}

getDatePart();

/* Date Locale 
a function that run AioDatetimeHelper.locale
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
      const dateHelper = new AioDatetimeHelper(date, 'toLocaleString');
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
