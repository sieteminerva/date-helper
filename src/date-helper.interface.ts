/**
 * 
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
 * 
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
 * 
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
  time: { hour: number; minute?: number; second?: number; };
  qty?: number;
  startId?: number;
}