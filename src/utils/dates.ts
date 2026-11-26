const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Next calendar date (from tomorrow onward) that falls on the given weekday ("Mon", "Tue", ...).
 * Starting tomorrow gives tutors at least a day's notice for a booking.
 */
export function nextDateForWeekday(day: string, from: Date = new Date()): Date {
  const target = WEEKDAYS.indexOf(day.slice(0, 3));
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  if (target < 0) return d;
  const diff = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

/** "Nov 30" */
export function formatShortDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** "Mon, Nov 30" */
export function formatDayAndDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
