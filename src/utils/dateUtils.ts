export function formatDate(date: Date, format: string = 'default'): string {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = dayNames[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  // Format the date based on the provided format string
  switch (format) {
    case 'default':
      return `${dayOfWeek}, ${getOrdinal(dayOfMonth)} of ${month} ${year}`;
    case 'MM/DD/YYYY':
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${dayOfMonth.toString().padStart(2, '0')}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
    case 'DD Month YYYY':
      return `${getOrdinal(dayOfMonth)} of ${month} ${year}`;
    // Add more formats as needed
    default:
      return `${dayOfWeek}, ${getOrdinal(dayOfMonth)} of ${month} ${year}`; // Fallback to default
  }
}
