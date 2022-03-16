const { format, formatDistance } = require("date-fns");
const en = require("date-fns/locale/en-US");

const formatValues = {
  default: "DD/MM/YYYY",
  defaultHour: "dd/MM/yyyy HH:mm",
  postgresDateFormat: "M/d/yyyy h:m:s a",
  validateDate: "yyyy/MM/dd",
  postgresCheckDateFormat: "d/M/yyyy h:m:s a",
  logPlatform: "MM/dd/yyyy h:mm a",
};

statDateValues = {
  milliseconds: "HH:mm:ss",
  second: "HH:mm:ss",
  minute: "HH:mm",
  hour: "LLL dd, yyyy HH",
  day: "LLL dd, yyyy",
  week: "wo yyyy",
  month: "LLL yyyy",
  quarter: "qqqq yyyy",
  year: "yyyy",
  decade: "yyyy",
  century: "yyyy",
  millennium: "yyyy",
};

outputStatDateValues = {
  milliseconds: "mm:ss",
  second: "mm:ss",
  minute: "HH:mm",
  hour: "dd HH",
  day: "LLL dd",
  week: "wo",
  month: "LLL",
  quarter: "qqqq yyyy",
  year: "yyyy",
  decade: "yyyy",
  century: "yyyy",
  millennium: "yyyy",
};

module.exports = {
  timeAgoFormattingBetweenTwoDate: (start, end) => {
    return formatDistance(new Date(parseInt(start)), new Date(parseInt(end)), {
      locale: en,
      includeSeconds: true,
    });
  },

  dateFormatting: (value, formatKey) => {
    return format(parseInt(value), formatValues[formatKey || "default"]);
  },

  statisticsDateFormatting: (value, formatKey = "day", output = false) => {
    return format(
      parseInt(value),
      output ? outputStatDateValues[formatKey] : statDateValues[formatKey]
    );
  },
};
