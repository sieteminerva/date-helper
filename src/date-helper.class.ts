/**
 * @description
 * Represents a distance in time, consisting of a numerical value and a unit of time.
 *
 * @interface IDatetimeDistance
 * @property {number} distance - The numerical value representing the distance.
 * @property {'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'} unit - The unit of time for the distance.
 */
export interface IDatetimeDistance {
  distance: number;
  unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
}

export interface IDatetimeMultiplier extends IDatetimeDistance {
  multiplier: number;
}

/**
 * @description
 * Represents a set of datetime parts, such as seconds, minutes, hours, days, months, and years.
 *
 * @interface IDatetimePartObject
 * @property {number} [second] - The number of seconds.
 * @property {number} [minute] - The number of minutes.
 * @property {number} [hour] - The number of hours.
 * @property {number} [day] - The number of days.
 * @property {number} [month] - The number of months.
 * @property {number} [year] - The number of years.
 */
export interface IDatetimePartObject {
  second?: number;
  minute?: number;
  hour?: number;
  day?: number;
  month?: number;
  year?: number;
}

/**
 * @description
 * Extends IDatetimePartObject to include a week property, representing a set of datetime parts with an additional week component.
 *
 * @interface IDatetimeMultiplier
 * @extends {IDatetimePartObject}
 * @property {number} [week] - The number of weeks.
 */
export interface IDatetimeMultiplier extends IDatetimePartObject {
  week?: number;
}

/**
 * @description
 * Configuration for a notification, including the range, time, quantity, and start ID.
 *
 * @interface INotificationConfig
 * @property {string} range - The range of the notification (e.g., 'daily', 'weekly').
 * @property {{ hour: number; minute?: number; second?: number }} time - The time of the notification.
 * @property {number} [qty] - The quantity of notifications.
 * @property {number} [startId] - The starting ID for the notification.
 */
export interface INotificationConfig {
  range: string;
  time: { hour: number; minute?: number; second?: number; };
  qty?: number;
  startId?: number;
}

/**
 * @description
 * A utility class for handling datetime operations, including calculating distances,
 * finding the next or last occurrence of a date, and extracting date parts.
 * 
 * @class AioDatetimeHelper
 */
export class AioDatetimeHelper {

  private _currentDate: Date;
  private _locale: string | string[] = 'en-ID';
  private _localeStringOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long', day: 'numeric',
    year: 'numeric', month: 'long'
  };
  private _format: string | boolean;

  /**
   * @description
   * Constructs a new AioDatetimeHelper instance.
   *
   * @param {Date} [currentDate=new Date()] - The current date to use for calculations.
   * @param {(string | boolean)} [format=false] - The desired format:
   - `false`: Returns a new Date object.
   - `'toLocaleString'`: Returns a localized string representation of the date.
   - `'toLocaleDateString'`: Returns a localized string representation of the date.
   - `'toNumber'`: Returns the date's timestamp (milliseconds since the Unix epoch).
   * @example `const dateHelper = new AioDatetimeHelper(new Date(), 'toLocaleString');`
   */
  constructor (
    currentDate: Date = new Date(),
    format: string | boolean = false) {

    this._currentDate = currentDate;
    this._format = format;

  }

  get currentDate(): Date {
    return this._currentDate; // Original Date Object non locale formatted
  }

  get locale(): string | string[] {
    return this._locale;
  }

  /**
   * @description
   * Sets the locale to use for formatting dates.
   * @param {string | string[]} value - The locale to use. It can be a single locale string (e.g., 'en-US') or an array of locale strings (e.g., ['en-US', 'fr-FR']).
   * @example <caption>Set locale to English (United States)</caption>
   * const dateHelper = new AioDatetimeHelper();
   * dateHelper.locale = 'en-US';
   */
  set locale(value: string | string[]) {
    this._locale = value;
  }

  get localeStringOptions() {
    return this._localeStringOptions;
  }

  set localeStringOptions(value) {
    this._localeStringOptions = value;
  }


  /**
   * @private
   * 
   * @description 
   * Generates a result based on the given date and format.
   *
   * @param {any} date - The date to format. It can be a Date object or a value that can be converted into one.
   * 
   * @returns {Date | string | number} The formatted date or timestamp.
   */
  private _setDateFormat(date: Date | any): Date | any {

    try {

      this._validateDate(date);
      /* if (!['toLocaleString', 'toNumber', false].includes(format)) {
        throw new Error('Invalid format');
      } */

      if (!this._format) {
        return new Date(date);
      } else if (this._format === 'toLocaleDateString' || this._format === 'toLocaleString') {
        return new Date(date).toLocaleDateString(this.locale, this.localeStringOptions);
      } else if (this._format === 'toNumber') {
        return new Date(date).getTime();
      } else if (this._format === 'toString') {
        return new Date(date).toString();
      } else if (this._format === 'toLocaleTimeString') {
        return new Date(date).toLocaleTimeString(this.locale);
      }

    } catch (error) {
      console.error(error);
      throw new Error(`Error generating result`);
    }


  }

  /**
   * @description 
   * Helper function that Returns the multiplier for the given time unit or an object with all units and their millisecond values.
   * example use for calculating date difference in seconds: `AioHelperDatetime.multiplier('second')`
   * 
   * @param {IDatetimeDistance["unit"]} [unit=null] - The time unit to get the multiplier for (optional).
   * @returns {number} The multiplier for the specified unit or an object with all units and their multipliers.
   */
  multiplier(unit?: IDatetimeDistance['unit']): number | { [unit: string]: number; } {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 31;
    const year = day * 365;
    const _multiplier = { second, minute, hour, day, week, month, year };

    if (unit) {
      return _multiplier[unit];
    } else {
      return _multiplier;
    }
  }

  /**
   * @description 
   * Extracts date parts from a "Date object" or 
   * Auto Normalizes excess time from one unit to another higher unit in an "IDatetimePartObject".
   * example use: {second:75, minute:90, hour:25} => {second: 15, minute: 31, hour: 2, day: 1}
   * @param {(IDatetimePartObject | Date)} params - The Date object or IDatetimePartObject to extract/normalize.
   * @returns {IDatetimePartObject} The extracted or normalized date parts.
   */
  getDatePart(params: IDatetimePartObject | Date): IDatetimePartObject {
    let result: IDatetimePartObject;

    if (params instanceof Date) {
      const year = params.getFullYear();
      const month = params.getMonth();
      const day = params.getDate();
      const hour = params.getHours();
      const minute = params.getMinutes();
      const second = params.getSeconds();
      result = { year, month, day, hour, minute, second };
    } else {

      /* 
      The function checks if the value of [propertyToCheck] in the params object exceeds the "limit". 
      If it does, it recalculates the value of [propertyToCheck] and adds the excess to [propertyToAdd]. 
      The function returns the updated params object.
      In essence, this function is used to "carry over" excess time from one unit to another 
      (e.g. from seconds to minutes, from minutes to hours, etc.)
      */
      const normalizeDatePart = (
        propertyToCheck: IDatetimeDistance['unit'],
        propertyToAdd: IDatetimeDistance['unit'],
        limit: number
      ) => {

        if ((params as any)[propertyToCheck] > limit) {
          const multiplier = (params as any)[propertyToCheck] / limit > 1 ? Math.trunc((params as any)[propertyToCheck] / limit) : 0;
          const remainer = (params as any)[propertyToCheck] - limit * multiplier;
          if (!params.hasOwnProperty(propertyToAdd)) {
            (params as any)[propertyToAdd] = multiplier;
          } else {
            (params as any)[propertyToAdd] = (params as any)[propertyToAdd] + multiplier;
          }
          (params as any)[propertyToCheck] = remainer;
        }

        return params;
      };

      // !!order matter!!
      params = { ...params, ...normalizeDatePart('second', 'minute', 60) };
      params = { ...params, ...normalizeDatePart('minute', 'hour', 60) };
      params = { ...params, ...normalizeDatePart('hour', 'day', 24) };
      params = { ...params, ...normalizeDatePart('day', 'month', 31) }; // pontential accuracy flaw
      params = { ...params, ...normalizeDatePart('month', 'year', 12) };
      result = params as IDatetimePartObject;

      for (const key in result) {
        if (result[key as keyof IDatetimePartObject] === null || result[key as keyof IDatetimePartObject] === undefined || result[key as keyof IDatetimePartObject] === 0) {
          delete result[key as keyof IDatetimePartObject];
        }
      }
    }

    return result;
  }


  /**
   * @description 
   * Calculates the date of the next Sunday.
   *
   * @param {(Date)} [params] - The date given to be calculated.
   * @returns {Date | string | number} The next Sunday, formatted according to the `format` parameter.
   * 
   * @example
   * const date = new Date('2022-13-19');
   * const nextSunday = dateHelper.nextSunday(date); // returns new Date('2022-03-23')
   */
  nextSunday(params?: Date): Date {
    const currentDate = this.currentDate;
    const date = params ? new Date(params) : new Date(currentDate);
    const sunday = 0; // sunday
    date.setDate(date.getDate() + ((sunday + 7 - date.getDay()) % 7));
    return this._setDateFormat(date);
  }

  /**
   * @description
   * Calculates the date of the last Sunday.
   *
   * @param {(Date)} [params] - The date given to be calculated.
   * @returns {Date | string | number} The last Sunday, formatted according to the `format` parameter.
   * 
   * @example
   * const date = new Date('2025-03-19');
   * const lastSunday = dateHelper.lastSunday(date); // returns new Date('2025-03-16')
   */
  lastSunday(params?: Date): Date {
    const currentDate = this.currentDate;
    const date = params ? new Date(params) : new Date(currentDate);
    const sunday = 0; // sunday
    date.setDate(date.getDate() - ((date.getDay() - sunday + 7) % 7));
    return this._setDateFormat(date);
  }


  /**
   * @description
   * Calculates the next date based on the given parameters.
   *
   * @param {...(IDatetimeDistance | IDatetimePartObject)} params - The parameters to calculate the next date.
   *  if params is an IDatetimeDistance object :
   *  - distance : number of distance you want to add.
   *  - unit : `second`, `minute`, `hour`, `day`, `week`, `month`, `year`
   *  if params is an IDatetimePartObject object :
   *  - second (optional) : the number of seconds to add.
   *  - minute (optional) : the number of minutes to add.
   *  - hour (optional) : the number of hours to add.
   *  - day (optional) : the number of days to add.
   *  - month (optional) : the number of months to add.
   *  - year (optional) : the number of years to add.
   * @returns {Date} The calculated next date.
   */
  next(...params: (IDatetimeDistance | IDatetimePartObject)[]): Date {
    const today = new Date(this.currentDate).getTime();
    let _result: number = today;

    params.forEach((param) => {
      if ('distance' in param && 'unit' in param) {
        _result += param.distance * (this.multiplier(param.unit) as number);
      } else {
        const datePart = this.getDatePart(param);
        for (const key in datePart) {
          const _multiplier = (datePart as any)[key] * (this.multiplier(key as IDatetimeDistance['unit']) as number);
          _result += _multiplier;
        }
      }
    });

    const date = new Date(_result);
    return this._setDateFormat(date);
  }



  /**
   * @description
   * Calculates the date of the last occurrence of the given parameters.
   *
   * @param {...(IDatetimeDistance | IDatetimePartObject)} params - The parameters to calculate the last date.
   *  if params is an IDatetimeDistance object :
   *  - distance : number of distance you want to remove.
   *  - unit : `second`, `minute`, `hour`, `day`, `week`, `month`, `year`
   *  if params is an IDatetimePartObject object :
   *  - second (optional) : the number of seconds to remove.
   *  - minute (optional) : the number of minutes to remove.
   *  - hour (optional) : the number of hours to remove.
   *  - day (optional) : the number of days to remove.
   *  - month (optional) : the number of months to remove.
   *  - year (optional) : the number of years to remove.
   * @returns {Date} The calculated last date.
   */
  last(...params: (IDatetimeDistance | IDatetimePartObject)[]): Date {
    const today = new Date(this.currentDate).getTime();
    let _result: number = today;

    params.forEach((param) => {
      if ('distance' in param && 'unit' in param) {
        _result -= param.distance * (this.multiplier(param.unit) as number);
      } else {
        const datePart = this.getDatePart(param);
        for (const key in datePart) {
          const _multiplier = (datePart as any)[key] * (this.multiplier(key as IDatetimeDistance['unit']) as number);
          _result -= _multiplier;
        }
      }
    });

    const date = new Date(_result);
    return this._setDateFormat(date);
  }


  /**
   * @description
   * Calculates the time difference between two dates.
   *
   * @param {Date} date1 - The first date.
   * @param {Date} [date2=this.currentDate] - The second date (defaults to today).
   * @returns {IDatetimePartObject} An object representing the time difference in years, months, days, hours, minutes, and seconds.
   * The properties with null, undefined or 0 value are delete.
   */
  distance(date1: Date, date2: Date = this.currentDate): IDatetimePartObject {

    this._validateDate(date1, date2);

    const _diff =
      date2.getTime() > date1.getTime()
        ? new Date(date2.getTime() - date1.getTime())
        : new Date(date1.getTime() - date2.getTime());

    const year = _diff.getUTCFullYear() - 1970;
    const month = _diff.getUTCMonth();
    const day = _diff.getUTCDate() - 1;
    const hour = _diff.getUTCHours();
    const minute = _diff.getUTCMinutes();
    const second = _diff.getUTCSeconds();

    const obj: IDatetimePartObject = { year, month, day, hour, minute, second };

    for (let key in obj) {
      if (obj[key as keyof IDatetimePartObject] === null || obj[key as keyof IDatetimePartObject] === undefined || obj[key as keyof IDatetimePartObject] === 0) {
        delete obj[key as keyof IDatetimePartObject];
      }
    }

    return obj;
  }


  /**
   * @private
   * @description
   * Validates a variable number of dates. If any of the passed values are not a valid Date object,
   * an Error is thrown with the position of the invalid date.
   *
   * @param {Date[]} dates - The array of dates to be validated.
   */
  private _validateDate(...dates: Date[]): void {
    dates.forEach((date, i) => {
      if (!(date instanceof Date)) {
        throw new Error(`Invalid date! You must pass a date on ${i + 1} position.`);
      }
    });
  }

}


/**
 * @description
 * An example implementation of the `Date Helper class` to generate a `schedules`.
 * Generates a Date object representing a scheduled date given a configuration and an index.
 *
 * @param {number} i - The index for the scheduled date.
 * @param {INotificationConfig} config - The configuration for the scheduled date.
 * @returns {Date} The scheduled Date object.
 */
export function generateScheduleDate(i: number, config: INotificationConfig): Date {
  const _Date = new AioDatetimeHelper();
  const currentHour = _Date.currentDate.getHours();
  _Date.locale = 'id-ID';
  let at: Date | string, hour: number;

  switch (config.range) {
    case "twice a day":
      if (i % 2 === 0) {
        hour = 7;
      } else if (i % 2 === 1) {
        hour = 21;
      } else { hour = 0; }
      at = new Date(_Date
        .next({ distance: i * 4, unit: 'hour' })
        .setHours(hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    case "three times a day":
      if (i % 3 === 0) {
        hour = 8;
      } else if (i % 3 === 1) {
        hour = 13;
      } else if (i % 3 === 2) {
        hour = 20;
      } else { hour = 0; }
      at = new Date(_Date
        .next({ distance: i * 8, unit: 'hour' })
        .setHours(hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    case "dialy":
      at = new Date(_Date
        .next({ distance: currentHour < (config.time.hour - 1) ? i : (i + 1), unit: 'day' })
        .setHours(config.time.hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    case "weekly":
      at = new Date(_Date
        .next({ distance: i, unit: 'week' })
        .setHours(config.time.hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    case "twice a week":
      at = new Date(_Date
        .next({ distance: i * 3, unit: 'day' })
        .setHours(config.time.hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    case "monthly":
      at = new Date(_Date
        .next({ distance: i, unit: 'month' })
        .setHours(config.time.hour, config.time.minute ?? 0, config.time.second ?? 0));
      break;
    default:
      at = new Date();
      break;
  }
  return at;
}


