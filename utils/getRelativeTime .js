import { formatDistanceToNow } from "date-fns";

/**
 *
 * @param {Date} dateInput
 * @default {new Date()} If no date is provided, it defaults to the current date.
 * @returns {string} Returns a string representing the relative time from the given date to now in Turkish.
 */
const getRelativeTime = (dateInput = new Date()) => {
   return formatDistanceToNow(new Date(dateInput), {
      addSuffix: true,
      locale: {
         code: "tr",
         formatLong: {
            date: "d MMMM yyyy",
            time: "HH:mm:ss",
            dateTime: "{{date}} {{time}}",
         },
         formatRelative: (token, _date, _baseDate, _options) => {
            const translations = {
               lastWeek: "'geçen' eeee 'saatinde'",
               yesterday: "'dün' p",
               today: "'bugün' p",
               tomorrow: "'yarın' p",
               nextWeek: "'gelecek' eeee 'saatinde'",
               other: "P",
            };
            return translations[token];
         },
         formatDistance: (token, count, options) => {
            const translations = {
               lessThanXSeconds: "birkaç saniye önce",
               xSeconds: `${count} saniye `,
               halfAMinute: "yarım dakika",
               lessThanXMinutes: "birkaç dakika",
               xMinutes: `${count} dakika önce`,
               aboutXHours: `${count} saat önce`,
               xHours: `${count} saat`,
               xDays: `${count} gün`,
               aboutXWeeks: `${count} hafta önce`,
               xWeeks: `${count} hafta`,
               aboutXMonths: `${count} ay önce`,
               xMonths: `${count} ay`,
               aboutXYears: `${count} yıl önce`,
               xYears: `${count} yıl`,
               overXYears: `yıllardan fazla ${count}`,
               almostXYears: `neredeyse ${count} yıl`,
            };
            return translations[token];
         },
      },
   });
};

export default getRelativeTime;
