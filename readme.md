# Date Helper Class

A utility class for working with dates in JavaScript.

>     npm install @jekipedia/date-helper


## Overview

The `DateHelper` class provides a set of methods for performing common date-related tasks, such as calculating the next or last occurrence of a date based on a given set of parameters.

## Usage
  copy `./src/date-helper.class.ts` and use it by importing the class to your project

```typescript
  import { AioDatetimeHelper } from '@jekipedia/date-helper';

  const currentDate = new Date(); // the date you want to calculate
  const format = 'toLocaleString' // date format
  const dateHelper = new AioDatetimeHelper(currentDate, format);
  dateHelper.locale = 'en-US' || ['en-US', 'id-ID']; // to set date locale

```

## Methods

### `distance(date1, date2)`

The `distance` method of the `AioDateHelper` class calculates the time difference between two dates and returns an object representing the difference in years, months, days, hours, minutes, and seconds.
* Parameters
  + `date1`: The first date.
  + `date2`: The second date `(optional, defaults to the current date)`.

* Returns
  An object of type `IDatetimePartObject` containing the time difference between `date1` and `date2`. The object properties are:
  + `year`: The difference in years.
  + `month`: The difference in months.
  + `day`: The difference in days.
  + `hour`: The difference in hours.
  + `minute`: The difference in minutes.
  + `second`: The difference in seconds.
  Properties with a value of 0, null, or undefined are removed from the returned object.

## Usage
```typescript
const dateHelper = new AioDatetimeHelper();
const date1 = new Date('2020-01-01');
const date2 = new Date('2022-06-15');

const difference = dateHelper.distance(date1, date2);
console.log(difference);
// Output: { year: 2, month: 5, day: 14, hour: 0, minute: 0, second: 0 }
```
* Notes
  + The method uses UTC dates to calculate the time difference.
  + The method validates the input dates before calculating the difference.
  + The `AioDateHelper` class provides a set of utility methods for working with dates and times. The `distance` method is one of the many methods available in the class.




### `multiplier()`

This method returns the multiplier for a given unit of time.
* Parameters
  + unit: A string representing the unit of time, one of: `second`, `minute`, `hour`, `day`, `week`, `month`, `year`.
* Returns
  A number representing the multiplier for the given unit of time.

## Usage
```typescript
const dateHelper = new AioDatetimeHelper();
const multiplier = dateHelper.multiplier('day'); // returns the multiplier for days
const multiplier = dateHelper.multiplier('hour'); // returns the multiplier for hours
```
* Multiplier Values
  + The multiplier values are used to convert between different units of time.
  + The values are based on the following conversions:
    - 1 second = 1000 milliseconds
    - 1 minute = 60 seconds
    - 1 hour = 60 minutes
    - 1 day = 24 hours
    - 1 week = 7 days
    - 1 month = 30 days (approximate)
    - 1 year = 365 days (approximate)
* Notes
  + This method is used to determine the multiplier for a given unit of time.
  + The multiplier values are used in other methods, such as next and last, to perform date calculations.

  

### `getDatePart(date)`

This method extracts date parts from a `Date` object or auto-normalizes excess time from one unit to another higher unit in an `IDatetimePartObject`.

* Parameters
  + `params`: An object that can be either:
    - A `Date` object.
    - An `IDatetimePartObject` object with the following optional properties:
        - `second`: The number of seconds.
        - `minute`: The number of minutes.
        - `hour`: The number of hours.
        - `day`: The number of days.
        - `month`: The number of months.
        - `year`: The number of years.
* Returns
  + An `IDatetimePartObject` object representing the extracted or normalized date parts.

## Usage

```typescript
const dateHelper = new AioDatetimeHelper();
const dateParts1 = dateHelper.getDatePart(new Date()); // extracts date parts from the current date
const dateParts2 = dateHelper.getDatePart({ second: 75, minute: 90, hour: 25 }); // normalizes excess time from one unit to another
  
```
### Normalization Rules
  + If the value of a property exceeds the limit of the unit, it is carried over to the next higher unit. For example:
    - If second is `75`, it is `carried over` to minute `(1 minute and 15 seconds)`.
    - If minute is `90`, it is `carried over` to hour `(1 hour and 30 minutes)`.
### Notes
  - This method is used to extract date parts from a `Date` object or to normalize excess time from one unit to another.
  - The resulting `IDatetimePartObject` can be used as input for other methods, such as next or last.




### `nextSunday() / lastSunday()`

Calculates the date of when the next / last Sunday from `parameter` or will calculated from `currentDate` given.

```typescript
  const dateHelper = new AioDatetimeHelper();
  const date = new Date('2022-13-19');
  const nextSunday = dateHelper.nextSunday(date); // returns new Date('2022-03-23')
  const lastSunday = dateHelper.lastSunday(date); // returns new Date('2025-03-16')
```
* Parameters
  + `date`: The given date.
* Returns
  + A `Date` object of next or last sunday from given `date` or `currentDate`




### `next() / last()`

This method calculates the next date based on the given parameters. It takes a variable number of parameters, which can be either `IDatetimeDistance` objects or `IDatetimePartObject` objects.

* Parameters: `params` A variable number of objects that can be either:
  + `IDatetimeDistance` objects with the following properties:
    - `distance`: The number of units to add.
    - `unit`: The unit of time to add (e.g., `second`, `minute`, `hour`, `day`,     `week`, `month`, `year`).
  + `IDatetimePartObject` objects with the following optional properties:
    - `second`: The number of seconds to add.
    - `minute`: The number of minutes to add.
    - `hour`: The number of hours to add.
    - `day`: The number of days to add.
    - `month`: The number of months to add.
    - `year`: The number of years to add.
* Returns: A `Date` object representing the calculated date , formatted according to the `_setDateFormat` method.

## Usage

```typescript
const dateHelper = new AioDatetimeHelper();

const nextDate1 = dateHelper.next({ distance: 1, unit: 'day' }); // adds 1 day to the current date
const lastDate1 = dateHelper.last({ distance: 1, unit: 'year' }, {distance: 3, unit: 'month'}); // adds 1 day to the current date
const nextDate2 = dateHelper.next({ second: 30, minute: 15 }); // adds 30 seconds and 15 minutes to the current date
const lastDate2 = dateHelper.last({ year: 1 }, { month: 2 }); // adds 1 year and 2 months to the current date

const calculatedNextDate = dateHelper.next(params);
console.log(calculatedNextDate);
const calculatedLastDate = dateHelper.last(params);
console.log(calculatedLastDate);
```


=====================================

Generate Schedule Date Function
=====================================

### Overview
  The `generateScheduleDate` function is an example usage of the `AioDatetimeHelper` class. It generates a schedule date based on the provided interval and notification configuration.

### Function Signature

```typescript
generateScheduleDate(i: number, config: INotificationConfig): Date
```

### Parameters
+ `i`: How many schedule date you want to create.
+ `config`: An object implementing the `INotificationConfig` interface, which contains notification settings.

### Returns
A `Date` object representing the generated schedule date.

## Usage
This function demonstrates how to utilize the `AioDatetimeHelper` class to calculate a schedule date based on a given interval and notification configuration. You can use this function as a starting point to integrate scheduling logic into your application.

### Example
```typescript

  const config: INotificationConfig = {
    range: 'twice a week',
    time: { hour: 12, minute: 0, second: 0 },
    qty: 7
  };
  
  // Create 7 date objects that fall within the range `twice a week` with time 12:00:00,
  for (let i = 0; i < (config.qty as number + 1); i++) {
    const at = generateScheduleDate(i, config);
    console.log(`date ${i} :`, at);
  }
  
```
Note that this function is an example usage of the `AioDatetimeHelper` class. You may need to modify it to fit your specific use case or application requirements.

cheers `YMGH` 🥳🍻
