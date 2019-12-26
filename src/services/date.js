//returns the actual date on string format (MM dd, YYYY)
export function getDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var date = new Date();

  let result =
    months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
  return result;
}
