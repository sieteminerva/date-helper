/**
 *
 * Represents a distance in time, consisting of a numerical value and a unit of time.
 *
 * @interface IDateDistance
 * @property {number} distance - The numerical value representing the distance.
 * @property {'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'} unit - The unit of time for the distance.
 */
export interface IDateDistance {
    distance: number;
    unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
}
export interface IDateMultiplier extends IDateDistance {
    multiplier: number;
}
/**
 *
 * Represents a set of datetime parts, such as seconds, minutes, hours, days, months, and years.
 *
 * @interface IDatePartObject
 * @property {number} [second] - The number of seconds.
 * @property {number} [minute] - The number of minutes.
 * @property {number} [hour] - The number of hours.
 * @property {number} [day] - The number of days.
 * @property {number} [month] - The number of months.
 * @property {number} [year] - The number of years.
 */
export interface IDatePartObject {
    second?: number;
    minute?: number;
    hour?: number;
    day?: number;
    month?: number;
    year?: number;
}
/**
 *
 * Extends IDatePartObject to include a week property, representing a set of datetime parts with an additional week component.
 *
 * @interface IDateMultiplier
 * @extends {IDatePartObject}
 * @property {number} [week] - The number of weeks.
 */
export interface IDateMultiplier extends IDatePartObject {
    week?: number;
}
/**
 *
 * Configuration for a notification, including the range, time, quantity, and start ID.
 *
 * @interface INotificationConfig
 * @property {string | `twice a day` | `three times a day` | `dialy` | `weekly` | `twice a week` | `monthly`} range - The range of the notification (e.g., 'daily', 'weekly').
 * @property {{ hour: number; minute?: number; second?: number }} time - The time of the notification.
 * @property {number} [qty] - The quantity of notifications.
 * @property {number} [startId] - The starting ID for the notification.
 */
export interface INotificationConfig {
    range: string | `twice a day` | `three times a day` | `dialy` | `weekly` | `twice a week` | `monthly`;
    time: {
        hour: number;
        minute?: number;
        second?: number;
    };
    qty?: number;
    startId?: number;
}
/**
 *
 * finding the next or last occurrence of a date, and extracting date parts.
 *
 * @class AioDateHelper v0.1.9
 */
export declare class AioDateHelper {
    private _currentDate;
    private _locale;
    private _localeStringOptions;
    private _format;
    /**
     *
     * Constructs a new AioDateHelper instance.
     *
     * @param {Date} [currentDate=new Date()] - The current date to use for calculations.
     * @param {(string | boolean)} [format=false] - The desired format:
     - `false`: Returns a new Date object.
     - `'toLocaleString'`: Returns a localized string representation of the date.
     - `'toLocaleDateString'`: Returns a localized string representation of the date.
     - `'toNumber'`: Returns the date's timestamp (milliseconds since the Unix epoch).
     * @example
     * ```ts
     *
     * const dateHelper = new AioDateHelper(new Date(), 'toLocaleString');`
     *
     * ```
     */
    constructor(currentDate?: Date, format?: string | boolean);
    get currentDate(): Date;
    get locale(): string | string[];
    /**
     *
     * Sets the locale to use for formatting dates.
     * @param {string | string[]} value - The locale to use. It can be a single locale string (e.g., 'en-US') or an array of locale strings (e.g., ['en-US', 'fr-FR']).
     * @example <caption>Set locale to English (United States)</caption>
     * ```ts
     *
     *    const dateHelper = new AioDateHelper();
     *    dateHelper.locale = 'en-US';
     *
     * ```
     */
    set locale(value: string | string[]);
    get localeStringOptions(): Intl.DateTimeFormatOptions;
    set localeStringOptions(value: Intl.DateTimeFormatOptions);
    /**
     * @private
     *
     *
     * Generates a result based on the given date and format.
     *
     * @param {any} date - The date to format. It can be a Date object or a value that can be converted into one.
     *
     * @returns {Date | string | number} The formatted date or timestamp.
     */
    private _setDateFormat;
    /**
     *
     * Helper function that Returns the multiplier for the given time unit or an object with all units and their millisecond values.
     * example use for calculating date difference in seconds: `AioHelperDate.multiplier('second')`
     *
     * @param {IDateDistance["unit"]} [unit=null] - The time unit to get the multiplier for (optional).
     * @returns {number} The multiplier for the specified unit or an object with all units and their multipliers.
     * @example
     * ```ts
     *
     *    const multiplier = multiplier('day'); // returns the multiplier for days
     *    const multiplier = multiplier('hour'); // returns the multiplier for hours
     *
     * ```
     */
    multiplier(unit?: IDateDistance['unit']): number | {
        [unit: string]: number;
    };
    /**
     *
     * Extracts date parts from a "Date object" or
     * Auto Normalizes excess time from one unit to another higher unit in an "IDatePartObject".
     * example use: {second:75, minute:90, hour:25} => {second: 15, minute: 31, hour: 2, day: 1}
     * @param {(IDatePartObject | Date)} params - The Date object or IDatePartObject to extract/normalize.
     * @returns {IDatePartObject} The extracted or normalized date parts.
     * @example
     * ```ts
     *
     *    // extracts date parts from the current date
     *    const dateParts = getDatePart(new Date());
     *
     *    // normalizes excess time from one unit to another
     *    const dateParts = getDatePart({ second: 75, minute: 90, hour: 25 });
     *
     * ```
     */
    getDatePart(params: IDatePartObject | Date): IDatePartObject;
    /**
     *
     * Calculates the date of the next Sunday.
     *
     * @param {(Date)} [params] - The date given to be calculated.
     * @returns {Date | string | number} The next Sunday, formatted according to the `format` parameter.
     *
     * @example
     * ```ts
     *
     *    const date = new Date('04-Mar-2025');
     *    const nextSunday = dateHelper.nextSunday(date);
     *    // returns new Date('09-Mar-2025')
     *
     * ```
     */
    nextSunday(params?: Date): Date;
    /**
     *
     * Calculates the date of the last Sunday.
     *
     * @param {(Date)} [params] - The date given to be calculated.
     * @returns {Date | string | number} The last Sunday, formatted according to the `format` parameter.
     *
     * @example
     * ```ts
     *
     *    const date = new Date('05-Mar-2025');
     *    const lastSunday = dateHelper.lastSunday(date);
     *    // returns new Date('02-Mar-2025')
     *
     * ```
     */
    lastSunday(params?: Date): Date;
    /**
     *
     * Calculates the next date based on the given parameters.
     *
     * @param {...(IDateDistance | IDatePartObject)} params - The parameters to calculate the next date.
     *  if params is an `IDateDistance` object :
     *  - distance : number of distance you want to add.
     *  - unit : `second`, `minute`, `hour`, `day`, `week`, `month`, `year`
     *  if params is an `IDatePartObject` object :
     *  - second (optional) : the number of seconds to add.
     *  - minute (optional) : the number of minutes to add.
     *  - hour (optional) : the number of hours to add.
     *  - day (optional) : the number of days to add.
     *  - month (optional) : the number of months to add.
     *  - year (optional) : the number of years to add.
     * @returns {Date} The calculated next date.
     * @example
     * ```ts
     *
     *    const dateHelper = new AioDateHelper();
     *
     *    const paramDistance1: IDateDistance = { distance: 1, unit: 'day' };
     *    const nextDate1 = dateHelper.next(param1); // adds 1 day to the current date
     *
     *    const paramDistance2: IDateDistance = { distance: 5, unit: 'year' };
     *    const nextDate2 = dateHelper.next(param1, param2); // adds 1 day and 5 years to the current date
     *
     *    const paramPart1:IDatePartObject = { year: 30 };
     *    const nextDate3 = dateHelper.next(param2); // adds 30 years to the current date
     *
     *    const paramPart2:IDatePartObject = { second: 25, minute: 15 };
     *    const nextDate4 = dateHelper.next(param1, param2); // adds 30 years + 25 seconds and 15 minutes to the current date
     *
     * ```
     *
     */
    next(...params: (IDateDistance | IDatePartObject)[]): Date;
    /**
     *
     * Calculates the date of the last occurrence of the given parameters.
     *
     * @param {...(IDateDistance | IDatePartObject)} params - The parameters to calculate the last date.
     *  if params is an IDateDistance object :
     *  - distance : number of distance you want to remove.
     *  - unit : `second`, `minute`, `hour`, `day`, `week`, `month`, `year`
     *  if params is an IDatePartObject object :
     *  - second (optional) : the number of seconds to remove.
     *  - minute (optional) : the number of minutes to remove.
     *  - hour (optional) : the number of hours to remove.
     *  - day (optional) : the number of days to remove.
     *  - month (optional) : the number of months to remove.
     *  - year (optional) : the number of years to remove.
     * @returns {Date} The calculated last date.
     * @example
     * ```ts
     *
     *    const dateHelper = new AioDateHelper();
     *    // adds 1 day to the current date
     *    const lastDate1 = dateHelper.last({ distance: 1, unit: 'year' }, {distance: 3, unit: 'month'});
     *    // adds 1 year and 2 months to the current date
     *    const lastDate2 = dateHelper.last({ year: 1 }, { month: 2 });
     *
     * ```
     *
     */
    last(...params: (IDateDistance | IDatePartObject)[]): Date;
    /**
     *
     * Calculates the time difference between two dates.
     *
     * @param {Date} date1 - The first date.
     * @param {Date} [date2=this.currentDate] - The second date (defaults to today).
     * @returns {IDatePartObject} An object representing the time difference in years, months, days, hours, minutes, and seconds.
     * The properties with null, undefined or 0 value are delete.
     * @example
     * ```ts
     *
     *    const aioDateHelper = new AioDateHelper();
     *    const date1 = new Date('2020-01-01');
     *    const date2 = new Date('2022-06-15');
     *
     *    const distance = aioDateHelper.distance(date1, date2);
     *    console.log(`distance :`, distance);
     *    // Output: { year: 2, month: 5, day: 14 }
     *
     * ```
     *
     */
    distance(date1: Date, date2?: Date): IDatePartObject;
    /**
     * @private
     *
     * Validates a variable number of dates. If any of the passed values are not a valid Date object,
     * an Error is thrown with the position of the invalid date.
     *
     * @param {Date[]} dates - The array of dates to be validated.
     */
    private _validateDate;
}
/**
 *
 * An example implementation of the `Date Helper class` to generate a `schedules`.
 * Generates a Date object representing a scheduled date given a configuration and an index.
 *
 * @param {number} i - The index for the scheduled date.
 * @param {INotificationConfig} config - The configuration for the scheduled date.
 * @returns {Date} The scheduled Date object.
 * @example
 * ```ts
 *
 *  const config: INotificationConfig = {
 *    range: 'twice a week',
 *    time: { hour: 12, minute: 0, second: 0 },
 *    qty: 7
 *  };
 *
 *  // Create 7 date objects that fall within the range `twice a week` with time 12:00:00,
 *  for (let i = 0; i < (config.qty as number + 1); i++) {
 *    const at = generateScheduleDate(i, config);
 *    console.log(`date ${i} :`, at);
 *  }
 *
 * ```
 */
export declare function generateScheduleDate(i: number, config: INotificationConfig): Date;
