export const addDays = (date, days) => {
  var _date = new Date(date.valueOf());
  _date.setDate(_date.getDate() + days);
  return _date;
}